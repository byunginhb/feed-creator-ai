import { Card } from '@/src/entities/card/model/types';
import { v4 as uuidv4 } from 'uuid';

export const MOCK_CARD: Card = {
  id: 'mock-1',
  ownerId: 'user-1',
  title: 'The Future of AI Agents',
  hook: "Why AI agents are the next big platform shift since mobile.",
  summary: "AI Agents are evolving from simple chatbots to autonomous systems that can execute complex tasks. \n\nThey plan, reason, and interact with the world through tools. \n\nThis shift moves us from 'chatting with AI' to 'working with AI teammates' who can code, research, and design alongside us.",
  sourceType: 'url',
  sourceUrl: 'https://example.com/ai-agents',
  sourceMeta: {
    domain: 'example.com',
    faviconUrl: 'https://www.google.com/s2/favicons?domain=deepmind.com&sz=128'
  },
  tone: 'professional',
  templateId: 'modern',
  visibility: 'private',
  viewCount: 0,
  shareCount: 0,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

interface GenerateResponse {
  title: string;
  domain: string;
  summary: string;
  hook: string;
  tone: string;
  backgroundImage?: string | null;
  error?: string;
  details?: string;
}

export const generateCard = async (url: string): Promise<Card> => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  const data: GenerateResponse = await response.json();

  if (!response.ok || data.error) {
    const error = new Error(data.error || 'Failed to generate card') as Error & { details?: string };
    error.details = data.details;
    throw error;
  }
  
  return {
    id: uuidv4(),
    ownerId: 'guest', // Temporary
    title: data.title,
    hook: data.hook,
    summary: data.summary,
    sourceType: 'url',
    sourceUrl: url,
    sourceMeta: {
      domain: data.domain,
      faviconUrl: `https://www.google.com/s2/favicons?domain=${data.domain}&sz=128`
    },
    tone: 'professional', // Default or from AI
    templateId: 'modern',
    backgroundImage: data.backgroundImage || undefined,
    visibility: 'private',
    viewCount: 0,
    shareCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
};
