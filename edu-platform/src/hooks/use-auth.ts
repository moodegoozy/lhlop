'use client';

import { useState, useEffect, useCallback } from 'react';
import { onAuthChange, signOut as firebaseSignOut } from '@/lib/firebase';
import { useAuthStore } from '@/store';
import type { User } from '@/types';

export function useFirebaseAuth() {
  const { setUser, clearUser, setLoading, isLoading } = useAuthStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        setUser(user);
      } else {
        clearUser();
      }
      setLoading(false);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, [setUser, clearUser, setLoading]);

  const logout = useCallback(async () => {
    try {
      await firebaseSignOut();
      clearUser();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [clearUser]);

  return { initialized, isLoading, logout };
}

export function useRequireAuth(redirectTo = '/auth/login') {
  const { user, isLoading } = useAuthStore();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        window.location.href = redirectTo;
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, isLoading, redirectTo]);

  return { user, isLoading, isAuthorized };
}
