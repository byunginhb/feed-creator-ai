'use client';

import { useState } from 'react';
import { useAuth } from '@/src/features/auth/model/useAuth';
import { useTranslations } from 'next-intl';
import { Button } from '@/src/shared/ui/button/Button';
import { Card } from '@/src/entities/card/model/types';
import { saveCard } from '../api/cardSaveApi';
import { Save } from 'lucide-react';

interface SaveCardButtonProps {
  card: Card | null;
  onSaved?: () => void;
}

export const SaveCardButton = ({ card, onSaved }: SaveCardButtonProps) => {
  const { user } = useAuth();
  const t = useTranslations('card');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!card || !user) {
      return;
    }

    try {
      setIsSaving(true);
      await saveCard(card, user.uid);
      onSaved?.();
    } catch (error: any) {
      console.error('Save error:', error);
      const errorMessage = error?.message || t('saveError');
      alert(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  if (!card) {
    return (
      <Button
        variant="outline"
        disabled
        className="w-full"
      >
        <Save className="w-4 h-4 mr-2" />
        {t('saveCard')}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleSave}
      disabled={isSaving}
      isLoading={isSaving}
      className="w-full"
    >
      {!isSaving && <Save className="w-4 h-4 mr-2" />}
      {isSaving ? t('saving') : t('saveCard')}
    </Button>
  );
};

