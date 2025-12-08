'use client';

import { useState } from 'react';
import { useAuth } from '../model/useAuth';
import { Button } from '@/src/shared/ui/button/Button';
import { useTranslations } from 'next-intl';
import { LogIn } from 'lucide-react';

export const GoogleSignInButton = () => {
  const { signInWithGoogle, loading } = useAuth();
  const t = useTranslations('auth');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      disabled={loading || isSigningIn}
      isLoading={isSigningIn}
      className="w-full"
    >
      {!isSigningIn && <LogIn className="w-4 h-4 mr-2" />}
      {isSigningIn ? t('signingIn') : t('signInWithGoogle')}
    </Button>
  );
};

