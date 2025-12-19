'use client';

import { useState } from 'react';
import { useAuth } from '@/src/features/auth/model/useAuth';
import { useTranslations } from 'next-intl';
import { Button } from '@/src/shared/ui/button/Button';
import { Card } from '@/src/entities/card/model/types';
import { saveCard } from '../api/cardSaveApi';
import { Save, LogIn } from 'lucide-react';
import { toast } from 'sonner';

interface SaveCardButtonProps {
  card: Card | null;
  onSaved?: () => void;
}

export const SaveCardButton = ({ card, onSaved }: SaveCardButtonProps) => {
  const { user, signInWithGoogle } = useAuth();
  const t = useTranslations('card');
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle();
      toast.success(t('loginSuccess'));
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error?.message || t('loginError'));
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSave = async () => {
    if (!card) {
      return;
    }

    // 로그인 체크 - 로그인 안 되어있으면 로그인 유도
    if (!user) {
      await handleSignIn();
      return;
    }

    try {
      setIsSaving(true);
      await saveCard(card, user.uid);
      onSaved?.();
      toast.success(t('saved'));
    } catch (error: any) {
      console.error('Save error:', error);
      const errorMessage = error?.message || t('saveError');
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  // 카드가 없으면 비활성화된 버튼
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

  // 로그인 안 된 상태
  if (!user) {
    return (
      <Button
        onClick={handleSignIn}
        disabled={isSigningIn}
        isLoading={isSigningIn}
        variant="outline"
        className="w-full"
      >
        {!isSigningIn && <LogIn className="w-4 h-4 mr-2" />}
        {isSigningIn ? t('loggingIn') : t('loginToSave')}
      </Button>
    );
  }

  // 로그인 된 상태
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
