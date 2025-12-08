export type CardVisibility = 'public' | 'unlisted' | 'private';
export type CardTone = 'friendly' | 'professional' | 'investor' | 'student';
export type CardSourceType = 'url' | 'text';

export type TemplateId = 'classic' | 'modern' | 'bold' | 'minimal';

export interface CardSourceMeta {
  title?: string;
  domain?: string;
  thumbnailUrl?: string;
  faviconUrl?: string;
}

export interface Card {
  id: string;
  ownerId: string;
  
  // Content
  title: string;
  hook: string;
  summary: string;
  
  // Source
  sourceType: CardSourceType;
  sourceUrl?: string;
  sourceMeta?: CardSourceMeta;
  
  // Style
  tone: CardTone;
  templateId: TemplateId;
  backgroundImage?: string;
  
  // Meta
  visibility: CardVisibility;
  viewCount: number;
  shareCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface CardTemplate {
  id: TemplateId;
  name: string;
  description: string;
  thumbnailUrl?: string;
}
