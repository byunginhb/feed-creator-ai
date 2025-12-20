import { Card } from "@/src/entities/card/model/types";
import { cn } from "@/src/shared/lib/utils";
import { useState } from "react";

interface TemplateProps {
  card: Card;
  className?: string;
  previewId?: string;
}

export const ModernTemplate = ({ card, className, previewId }: TemplateProps) => {
  const [imageError, setImageError] = useState(false);
  const showBackgroundImage = card.backgroundImage && !imageError;
  return (
    <div
      id={previewId}
      className={cn(
        "relative w-full aspect-[9/16] text-white p-[8%] flex flex-col justify-between shadow-2xl rounded-xl border border-[rgba(255,255,255,0.05)] overflow-hidden",
        className
      )}
      style={{
        backgroundColor: '#05070d',
        backgroundImage: 'linear-gradient(to bottom right, #0b1220, #05070d)',
      }}
    >
      {/* Background Image (If available) */}
      {showBackgroundImage && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.backgroundImage}
            alt="Card Background"
            crossOrigin="anonymous"
            className="w-full h-full object-cover opacity-100"
            onError={() => setImageError(true)}
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
      {!showBackgroundImage && (
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
      <div className="relative z-10 shrink-0">
        <div className="flex items-center gap-2 mb-[4%] opacity-70">
          <span className="text-[0.5em] uppercase tracking-widest font-semibold">
            FeedCreator
          </span>
        </div>

        <h1 className="card-title text-[1.2em] font-bold leading-tight tracking-tight drop-shadow-lg line-clamp-3">
          {card.title}
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center overflow-hidden min-h-0">
        <p className="text-[0.7em] leading-relaxed text-[rgba(255,255,255,0.9)] font-semibold whitespace-pre-wrap drop-shadow-md line-clamp-12">
          {card.summary}
        </p>
      </div>

      {/* Footer / Hook */}
      <div className="relative z-10 pt-[4%] border-t border-[rgba(255,255,255,0.10)] shrink-0">
        <p className="text-[0.8em] font-bold text-white drop-shadow-md line-clamp-2">
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
