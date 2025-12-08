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
    const cardDoc: Omit<CardDocument, 'createdAt' | 'updatedAt'> = {
      ownerId: userId,
      title: card.title,
      hook: card.hook,
      summary: card.summary,
      sourceType: card.sourceType,
      sourceUrl: card.sourceUrl,
      sourceMeta: card.sourceMeta,
      tone: card.tone,
      templateId: card.templateId,
      backgroundImage: card.backgroundImage,
      visibility: card.visibility,
      viewCount: card.viewCount,
      shareCount: card.shareCount,
    };

    const docRef = await addDoc(collection(db, CARDS_COLLECTION), {
      ...cardDoc,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error saving card:', error);
    throw new Error('Failed to save card');
  }
};

export const getUserCards = async (userId: string): Promise<Card[]> => {
  try {
    const q = query(
      collection(db, CARDS_COLLECTION),
      where('ownerId', '==', userId),
      orderBy('createdAt', 'desc')
    );

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

    return cards;
  } catch (error) {
    console.error('Error fetching user cards:', error);
    throw new Error('Failed to fetch cards');
  }
};

