import { Card } from '@/src/entities/card/model/types';
import { db, storage } from '@/src/shared/lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const CARDS_COLLECTION = 'cards';

const isDataImageUrl = (value: string) =>
  value.startsWith('data:image/') && value.includes('base64,');

const estimateDataUrlBytes = (dataUrl: string) => {
  const idx = dataUrl.indexOf('base64,');
  if (idx === -1) return dataUrl.length;
  const base64 = dataUrl.slice(idx + 'base64,'.length);
  const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
  return Math.floor((base64.length * 3) / 4) - padding;
};

const safeUploadId = () => {
  const cryptoObj = (globalThis as unknown as { crypto?: any }).crypto;
  if (cryptoObj?.randomUUID) {
    return cryptoObj.randomUUID();
  }
  if (cryptoObj?.getRandomValues) {
    const bytes = new Uint8Array(16);
    cryptoObj.getRandomValues(bytes);
    return Array.from(bytes, (b: number) => b.toString(16).padStart(2, '0')).join('');
  }
  return `${Date.now()}`;
};

const withTimeout = async <T,>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string
): Promise<T> => {
  return await new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error(errorMessage)), timeoutMs);
    promise
      .then((value) => {
        clearTimeout(id);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(id);
        reject(err);
      });
  });
};

const compressDataImageUrlIfPossible = async (dataUrl: string): Promise<string> => {
  if (typeof window === 'undefined') return dataUrl;
  if (!isDataImageUrl(dataUrl)) return dataUrl;

  const bytes = estimateDataUrlBytes(dataUrl);
  if (bytes < 450 * 1024) return dataUrl;

  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = dataUrl;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load data url image'));
    });

    const maxWidth = 1080;
    const scale = img.width > maxWidth ? maxWidth / img.width : 1;
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return dataUrl;
    ctx.drawImage(img, 0, 0, width, height);

    const jpeg = canvas.toDataURL('image/jpeg', 0.86);
    return jpeg || dataUrl;
  } catch {
    return dataUrl;
  }
};

const uploadBackgroundImageIfNeeded = async (
  backgroundImage: string | undefined,
  userId: string
): Promise<string | undefined> => {
  if (!backgroundImage) return undefined;
  if (!isDataImageUrl(backgroundImage)) return backgroundImage;
  const originalBytes = estimateDataUrlBytes(backgroundImage);
  if (originalBytes > 6 * 1024 * 1024) {
    return undefined;
  }
  const dataUrl = await compressDataImageUrlIfPossible(backgroundImage);
  const bytes = estimateDataUrlBytes(dataUrl);

  try {
    const mime = dataUrl.startsWith('data:image/png') ? 'image/png' : 'image/jpeg';
    const ext = mime === 'image/png' ? 'png' : 'jpg';
    const objectRef = ref(
      storage,
      `users/${userId}/card-backgrounds/${safeUploadId()}.${ext}`
    );
    await withTimeout(
      uploadString(objectRef, dataUrl, 'data_url', {
        contentType: mime,
        cacheControl: 'public,max-age=31536000,immutable',
      }),
      20000,
      'Background image upload timed out'
    );
    return await withTimeout(
      getDownloadURL(objectRef),
      15000,
      'Failed to resolve background image URL'
    );
  } catch (e) {
    console.error('Failed to upload backgroundImage, saving without it:', e);
    return undefined;
  }
};

export interface CardDocument {
  ownerId: string;
  title: string;
  hook: string;
  summary: string;
  sourceType: Card['sourceType'];
  sourceUrl?: string;
  sourceMeta?: Card['sourceMeta'];
  tone: Card['tone'];
  templateId: Card['templateId'];
  backgroundImage?: string;
  visibility: Card['visibility'];
  viewCount: number;
  shareCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const saveCard = async (card: Card, userId: string): Promise<string> => {
  try {
    // 필수 필드 검증
    if (!card.title || !card.hook || !card.summary) {
      throw new Error('카드 정보가 불완전합니다.');
    }

    const backgroundImage = await uploadBackgroundImageIfNeeded(
      card.backgroundImage,
      userId
    );

    const cardDoc: Omit<CardDocument, 'createdAt' | 'updatedAt'> = {
      ownerId: userId,
      title: card.title,
      hook: card.hook,
      summary: card.summary,
      sourceType: card.sourceType,
      sourceUrl: card.sourceUrl || undefined,
      sourceMeta: card.sourceMeta || undefined,
      tone: card.tone,
      templateId: card.templateId,
      backgroundImage,
      visibility: card.visibility,
      viewCount: card.viewCount || 0,
      shareCount: card.shareCount || 0,
    };

    const docRef = await withTimeout(
      addDoc(collection(db, CARDS_COLLECTION), {
        ...cardDoc,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }),
      20000,
      'Card save timed out'
    );

    return docRef.id;
  } catch (error: any) {
    console.error('Error saving card:', error);
    
    // Firestore 권한 에러
    if (error?.code === 'permission-denied') {
      throw new Error('카드 저장 권한이 없습니다. 로그인 상태를 확인해주세요.');
    }
    
    // 네트워크 에러
    if (error?.code === 'unavailable') {
      throw new Error('네트워크 연결을 확인해주세요.');
    }
    
    const errorMessage = error?.message || 'Failed to save card';
    throw new Error(errorMessage);
  }
};

export const getUserCards = async (userId: string): Promise<Card[]> => {
  try {
    // orderBy를 사용할 때 인덱스가 필요할 수 있으므로, 먼저 where만 사용해서 시도
    let q = query(
      collection(db, CARDS_COLLECTION),
      where('ownerId', '==', userId)
    );

    try {
      // orderBy를 추가해서 시도
      q = query(
        collection(db, CARDS_COLLECTION),
        where('ownerId', '==', userId),
        orderBy('createdAt', 'desc')
      );
    } catch (indexError) {
      // 인덱스가 없으면 orderBy 없이 진행하고 클라이언트에서 정렬
      console.warn('Index not found, sorting client-side:', indexError);
    }

    const querySnapshot = await getDocs(q);
    const cards: Card[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as CardDocument;
      cards.push({
        id: doc.id,
        ownerId: data.ownerId,
        title: data.title,
        hook: data.hook,
        summary: data.summary,
        sourceType: data.sourceType,
        sourceUrl: data.sourceUrl,
        sourceMeta: data.sourceMeta,
        tone: data.tone,
        templateId: data.templateId,
        backgroundImage: data.backgroundImage,
        visibility: data.visibility,
        viewCount: data.viewCount,
        shareCount: data.shareCount,
        createdAt: data.createdAt.toMillis(),
        updatedAt: data.updatedAt.toMillis(),
      });
    });

    // 클라이언트에서 정렬 (인덱스가 없을 경우)
    cards.sort((a, b) => b.createdAt - a.createdAt);

    return cards;
  } catch (error: any) {
    console.error('Error fetching user cards:', error);
    const errorMessage = error?.message || 'Failed to fetch cards';
    
    // 인덱스 관련 에러인 경우 더 명확한 메시지
    if (error?.code === 'failed-precondition') {
      throw new Error('Firestore 인덱스가 필요합니다. Firebase Console에서 인덱스를 생성해주세요.');
    }
    
    throw new Error(errorMessage);
  }
};
