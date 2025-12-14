"use client";

import { useState } from "react";
import { Button } from "@/src/shared/ui/button/Button";
import { Input } from "@/src/shared/ui/input/Input";
import { generateCard } from "@/src/entities/card/api/cardApi";
import { Card } from "@/src/entities/card/model/types";
import { Wand2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface UrlInputFormProps {
  onSuccess: (card: Card) => void;
  onGenerationStart?: () => void;
}

export const UrlInputForm = ({
  onSuccess,
  onGenerationStart,
}: UrlInputFormProps) => {
  const t = useTranslations("card");
  const tErrors = useTranslations("errors");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setError(null);
    setProgress(0);
    onGenerationStart?.();

    // 시뮬레이션 진행률 (실제 API 호출 중에는 이벤트로 업데이트)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    try {
      // Logic: call creation API
      const newCard = await generateCard(url);
      clearInterval(progressInterval);
      setProgress(100);

      // 성공 애니메이션을 위한 약간의 지연
      setTimeout(() => {
        onSuccess(newCard);
        setUrl("");
        setProgress(0);
      }, 500);
    } catch (err: any) {
      clearInterval(progressInterval);
      console.error(err); // Log error for debugging
      // API에서 반환한 에러 메시지 사용
      const errorMessage =
        err?.message || err?.error || tErrors("failedToGenerate");
      const errorDetails = err?.details || "";
      setError(
        errorDetails ? `${errorMessage}: ${errorDetails}` : errorMessage
      );
      setProgress(0);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="space-y-2">
        <label
          htmlFor="url-input"
          className="text-sm font-medium text-muted-foreground"
        >
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
        className="group relative w-full bg-linear-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 overflow-hidden"
        size="lg"
        isLoading={isLoading}
        disabled={isLoading}
      >
        {/* Animated background */}
        {isLoading && (
          <div className="absolute inset-0 bg-linear-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-x" />
        )}

        {/* Sparkle particles */}
        {isLoading && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
                style={{
                  left: `${20 + i * 15}%`,
                  top: "50%",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}

        <span className="relative z-10 flex items-center justify-center gap-2">
          {!isLoading ? (
            <>
              <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              {t("generateMagicCard")}
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 animate-spin" />
              <span className="animate-pulse">{t("generatingMagic")}</span>
            </>
          )}
        </span>
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        {t("takesTime")}
      </p>

      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes sparkle {
          0% {
            transform: translateY(0) scale(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-20px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-40px) scale(0);
            opacity: 0;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 2s ease infinite;
        }
        .animate-sparkle {
          animation: sparkle 1s ease-out infinite;
        }
      `}</style>
    </form>
  );
};
