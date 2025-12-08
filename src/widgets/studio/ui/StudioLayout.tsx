"use client";

import { useState } from "react";
import { Card } from "@/src/entities/card/model/types";
import { CardPreview } from "@/src/entities/card/ui/CardPreview";
import { UrlInputForm } from "@/src/features/card-create/ui/UrlInputForm";
import { SaveCardButton } from "@/src/features/card-save/ui/SaveCardButton";
import { DownloadButton } from "@/src/features/card-download/ui/DownloadButton";
import { useTranslations } from "next-intl";

export const StudioLayout = () => {
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const t = useTranslations("card");
  // Future: simple state for now, move to context/zustand if complex

  const handleCardGenerationStart = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
  };

  const handleCardGenerationComplete = (card: Card) => {
    setIsGenerating(false);
    setGenerationProgress(0);
    setActiveCard(card);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] p-4 gap-6 w-full mx-autop lg:px-20">
      {/* Left Panel: Controls */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        {/* Create Section */}
        <section className="bg-card/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
          {/* Animated background when generating */}
          {isGenerating && (
            <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-violet-600/10 to-primary/10 animate-gradient-shift" />
          )}
          <div className="relative z-10">
            <div className="mb-4">
              <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
                {t("createNew")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("startFromLink")}
              </p>
            </div>
            <UrlInputForm
              onSuccess={handleCardGenerationComplete}
              onGenerationStart={handleCardGenerationStart}
            />
          </div>
        </section>

        {/* Edit Section */}
        {activeCard && (
          <section className="bg-card/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl flex-1 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
            {/* Success glow effect */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-violet-600/10 opacity-0 animate-fade-in-success" />

            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <h2 className="text-lg font-medium text-slate-200">
                  {t("editCard")}
                </h2>
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                {t("editorOptions")}
              </div>
              <div className="space-y-2">
                <SaveCardButton card={activeCard} />
                <DownloadButton cardId={activeCard.id} />
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Right Panel: Preview */}
      <div className="w-full lg:w-2/3 flex items-center justify-center bg-black/20 rounded-3xl border border-white/5 p-8 lg:p-12 relative overflow-hidden">
        {/* Animated background when generating */}
        {isGenerating && (
          <>
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-violet-600/5 to-primary/5 animate-pulse" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
          </>
        )}

        {/* Grid Background */}
        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none transition-opacity duration-500 ${
            isGenerating ? "opacity-50" : "opacity-100"
          }`}
        />

        <div className="w-full max-w-sm relative z-10 transition-all duration-500 ease-out transform">
          <CardPreview
            card={activeCard}
            isLoading={isGenerating}
            progress={generationProgress}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes fade-in-success {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.5;
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        .animate-fade-in-success {
          animation: fade-in-success 2s ease-out;
        }
      `}</style>
    </div>
  );
};
