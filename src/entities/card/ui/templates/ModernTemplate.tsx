import { Card } from "@/src/entities/card/model/types";
import { cn } from "@/src/shared/lib/utils";

interface TemplateProps {
  card: Card;
  className?: string;
  previewId?: string;
}

export const ModernTemplate = ({ card, className, previewId }: TemplateProps) => {
  return (
    <div
      id={previewId}
      className={cn(
        "relative w-full aspect-[9/16] text-white p-8 flex flex-col justify-between shadow-2xl rounded-xl border border-[rgba(255,255,255,0.05)]",
        className
      )}
      style={{
        backgroundColor: '#05070d',
        backgroundImage: 'linear-gradient(to bottom right, #0b1220, #05070d)',
      }}
    >
      {/* Background Image (If available) */}
      {card.backgroundImage && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.backgroundImage}
            alt="Card Background"
            crossOrigin="anonymous"
            className="w-full h-full object-cover opacity-100"
          />
          <div
            className="absolute opacity-40 inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to top, rgba(5,7,13,1), rgba(5,7,13,0.8), rgba(5,7,13,0.4))',
            }}
          />
        </div>
      )}

      {/* Background decoration (Only if no image, or as subtle overlay) */}
      {!card.backgroundImage && (
        <>
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"
            style={{ backgroundColor: 'rgba(245,158,11,0.18)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"
            style={{ backgroundColor: 'rgba(249,115,22,0.14)' }}
          />
        </>
      )}

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6 opacity-70">
          {/* Domain hidden as per request */}
          <span className="text-xs uppercase tracking-widest font-semibold">
            FeedCreator
          </span>
        </div>

        <h1 className="card-title text-3xl font-bold leading-tight tracking-tight mb-2 drop-shadow-lg">
          {card.title}
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-[rgba(255,255,255,0.9)] font-semibold whitespace-pre-wrap drop-shadow-md">
            {card.summary}
          </p>
        </div>
      </div>

      {/* Footer / Hook */}
      <div className="relative z-10 mt-8 pt-6 border-t border-[rgba(255,255,255,0.10)]">
        <p className="text-xl font-bold text-white drop-shadow-md">
          "{card.hook}"
        </p>
      </div>

      <style jsx>{`
        .card-title {
          background-image: linear-gradient(
            to right,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0.7)
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        [data-export-mode='true'] .card-title {
          background-image: none !important;
          -webkit-background-clip: initial !important;
          background-clip: initial !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.92) !important;
          color: rgba(255, 255, 255, 0.92) !important;
        }
      `}</style>
    </div>
  );
};
