'use client';

import { useState } from 'react';
import { Button } from '@/src/shared/ui/button/Button';
import { Input } from '@/src/shared/ui/input/Input';
import { generateCard } from '@/src/entities/card/api/cardApi';
import { Card } from '@/src/entities/card/model/types';
import { Wand2 } from 'lucide-react';

interface UrlInputFormProps {
  onSuccess: (card: Card) => void;
}

export const UrlInputForm = ({ onSuccess }: UrlInputFormProps) => {
  const [url, setUrl] = useState('https://m.entertain.naver.com/home/article/312/0000739123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Logic: call creation API
      const newCard = await generateCard(url);
      onSuccess(newCard);
      setUrl('');
    } catch (err) {
      console.error(err); // Log error for debugging
      setError('Failed to generate card. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="space-y-2">
        <label htmlFor="url-input" className="text-sm font-medium text-slate-300">
           Content Source URL
        </label>
        <div className="flex gap-2">
          <Input 
            id="url-input"
            placeholder="Paste article or video URL..." 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
        </div>
      </div>
      
      {error && <div className="text-destructive text-sm">{error}</div>}

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-primary to-violet-600 hover:opacity-90 transition-opacity"
        size="lg"
        isLoading={isLoading}
      >
        {!isLoading && <Wand2 className="w-4 h-4 mr-2" />}
        Generate Magic Card
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        Takes about 10-20 seconds to read and summarize.
      </p>
    </form>
  );
};
