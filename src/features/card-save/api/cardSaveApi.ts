import { Card } from '@/src/entities/card/model/types';
import { db } from '@/src/shared/lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';

const CARDS_COLLECTION = 'cards';

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
      backgroundImage: card.backgroundImage || undefined,
      visibility: card.visibility,
      viewCount: card.viewCount || 0,
      shareCount: card.shareCount || 0,
    };

    const docRef = await addDoc(collection(db, CARDS_COLLECTION), {
      ...cardDoc,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

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

