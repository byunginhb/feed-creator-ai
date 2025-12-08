import { Card } from '@/src/entities/card/model/types';
import { ModernTemplate } from '@/src/entities/card/ui/templates/ModernTemplate';

interface CardPreviewProps {
  card: Card | null;
  isLoading?: boolean;
}

export const CardPreview = ({ card, isLoading }: CardPreviewProps) => {
  if (isLoading) {
    return (
      <div className="w-full aspect-[9/16] bg-card rounded-xl border border-border animate-pulse flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Generating magic...</div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="w-full aspect-[9/16] bg-card/50 rounded-xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
        <p>No card generated yet</p>
        <p className="text-xs mt-2 opacity-50">Enter a URL or text to get started</p>
      </div>
    );
  }

  // Switch templates here
  switch (card.templateId) {
    case 'modern':
    default:
      return <ModernTemplate card={card} />;
  }
};
