"use client";

import { Card } from "@/src/entities/card/model/types";
import { ModernTemplate } from "@/src/entities/card/ui/templates/ModernTemplate";
import { useTranslations } from "next-intl";
import { GeneratingAnimation } from "@/src/features/card-create/ui/GeneratingAnimation";
import { useEffect, useState } from "react";

interface CardPreviewProps {
  card: Card | null;
  isLoading?: boolean;
  progress?: number;
}

export const CardPreview = ({
  card,
  isLoading,
  progress,
}: CardPreviewProps) => {
  const t = useTranslations("card");
  const [showCard, setShowCard] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setShowCard(false);
      setAnimationProgress(0);
      // 시뮬레이션 진행률 (실제로는 API 호출 진행률 사용)
      const interval = setInterval(() => {
        setAnimationProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + Math.random() * 10;
        });
      }, 800);
      return () => clearInterval(interval);
    } else if (card) {
      setAnimationProgress(100);
      setTimeout(() => {
        setShowCard(true);
      }, 300);
    }
  }, [isLoading, card]);

  if (isLoading) {
    return <GeneratingAnimation progress={progress || animationProgress} />;
  }

  if (!card) {
    return (
      <div className="w-full aspect-[9/16] bg-card/50 rounded-xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center text-muted-foreground p-8 text-center relative overflow-hidden">
        {/* Subtle background animation */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-violet-600/5 animate-pulse" />
        <div className="relative z-10">
          <p className="text-lg font-medium">{t("noCardGenerated")}</p>
          <p className="text-xs mt-2 opacity-50">{t("enterUrlToStart")}</p>
        </div>
      </div>
    );
  }

  // Card reveal animation
  return (
    <div
      className={`w-full transition-all duration-700 ${
        showCard ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <div className="relative">
        {/* Glow effect on card */}
        <div className="absolute -inset-2 bg-linear-to-r from-primary/20 to-violet-600/20 rounded-xl blur-xl opacity-0 animate-fade-in" />
        <div className="relative">
          <ModernTemplate card={card} />
        </div>

        {/* Success particles */}
        {showCard && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full animate-success-particle"
                style={{
                  left: "50%",
                  top: "50%",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes success-particle {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(
                calc(-50% + ${Math.random() * 200 - 100}px),
                calc(-50% + ${Math.random() * 200 - 100}px)
              )
              scale(1) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-success-particle {
          animation: success-particle 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
