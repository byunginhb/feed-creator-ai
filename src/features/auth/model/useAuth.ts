'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '@/src/shared/lib/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      // Firebase Auth가 제대로 초기화되었는지 확인
      if (!auth) {
        throw new Error('Firebase Auth is not initialized. Please check your Firebase configuration.');
      }

      const provider = new GoogleAuthProvider();
      // 추가 설정: 계정 선택 화면 표시
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      
      // 더 명확한 에러 메시지 제공
      if (error?.code === 'auth/configuration-not-found') {
        throw new Error(
          'Google 로그인이 설정되지 않았습니다. Firebase Console에서 Google 로그인 제공자를 활성화해주세요.'
        );
      }
      
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signOut
  };
};

