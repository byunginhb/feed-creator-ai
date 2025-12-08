import { Card } from '@/src/entities/card/model/types';
import { cn } from '@/src/shared/lib/utils';

interface TemplateProps {
  card: Card;
  className?: string;
}

export const ModernTemplate = ({ card, className }: TemplateProps) => {
  return (
    <div 
      id="card-preview"
      className={cn(
        "relative w-full aspect-[9/16] bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 flex flex-col justify-between shadow-2xl rounded-xl border border-white/5",
        className
      )}
    >
      {/* Background Image (If available) */}
      {card.backgroundImage && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={card.backgroundImage} 
            alt="Card Background" 
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute opacity-40 inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
        </div>
      )}

      {/* Background decoration (Only if no image, or as subtle overlay) */}
      {!card.backgroundImage && (
        <>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        </>
      )}

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6 opacity-70">
           {/* Domain hidden as per request */}
           <span className="text-xs uppercase tracking-widest font-semibold">FeedCreator</span>
        </div>
        
        <h1 className="text-3xl font-bold leading-tight tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 drop-shadow-lg">
          {card.title}
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-slate-100 font-semibold whitespace-pre-wrap drop-shadow-md">
            {card.summary}
          </p>
        </div>
      </div>

      {/* Footer / Hook */}
      <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
        <p className="text-xl font-bold text-accent-foreground drop-shadow-md">
          "{card.hook}"
        </p>
      </div>
    </div>
  );
};
