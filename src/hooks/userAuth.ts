// src/hooks/useAuth.ts
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  return auth.currentUser;
};

export default useAuth;
