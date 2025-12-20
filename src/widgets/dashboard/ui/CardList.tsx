"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/features/auth/model/useAuth";
import { useTranslations } from "next-intl";
import { Card } from "@/src/entities/card/model/types";
import { getUserCards } from "@/src/features/card-save/api/cardSaveApi";
import { CardPreview } from "@/src/entities/card/ui/CardPreview";
import { DownloadButton } from "@/src/features/card-download/ui/DownloadButton";
import { Loader2 } from "lucide-react";

export const CardList = () => {
  const { user } = useAuth();
  const t = useTranslations();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  useEffect(() => {
    if (user) {
      loadCards();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadCards = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const userCards = await getUserCards(user.uid);
      setCards(userCards);
    } catch (error) {
      console.error("Error loading cards:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">{t("auth.notSignedIn")}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-muted-foreground text-lg">{t("card.noCards")}</p>
        <p className="text-muted-foreground text-sm">
          {t("card.createFirstCard")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("card.myCards")}</h1>
        <p className="text-sm text-muted-foreground">
          {cards.length} {t("common.cards")}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-card/30 border border-border rounded-lg p-2 hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setSelectedCard(card)}
          >
            <div className="w-full text-[14px] sm:text-[16px]">
              <CardPreview
                card={card}
                previewId={`card-preview-grid-${card.id}`}
              />
            </div>
            <div className="mt-2 space-y-1 px-1">
              <h3 className="font-semibold text-xs line-clamp-1">{card.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Card Detail Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="flex flex-col gap-4 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-[280px] sm:w-[320px] text-[20px] sm:text-[24px]">
              <CardPreview
                card={selectedCard}
                previewId={`card-preview-modal-${selectedCard.id}`}
              />
            </div>
            <DownloadButton
              cardId={selectedCard.id}
              previewId={`card-preview-modal-${selectedCard.id}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};
