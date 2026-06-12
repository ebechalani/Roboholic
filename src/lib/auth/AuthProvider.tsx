'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile as updateAuthProfile,
  sendPasswordResetEmail,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase/client';
import type { Profile, UserRole, AgeGroupId, AccountStatus } from '@/types';

interface AuthContextValue {
  firebaseUser: FirebaseUser | null;
  profile: Profile | null;
  role: UserRole | null;
  /** 'approved' for legacy accounts with no status field. */
  status: AccountStatus | null;
  loading: boolean;
  configured: boolean;
  refreshProfile: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (args: {
    email: string;
    password: string;
    fullName: string;
    role: UserRole;
    ageGroup?: AgeGroupId;
  }) => Promise<void>;
  signOutUser: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Subscribe to auth state and load the Firestore profile.
  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
          const snap = await getDoc(doc(db, 'users', user.uid));
          if (snap.exists()) {
            setProfile({ uid: user.uid, ...(snap.data() as Omit<Profile, 'uid'>) });
          } else {
            // Profile missing (e.g. created outside the app) — minimal fallback.
            setProfile({
              uid: user.uid,
              full_name: user.displayName ?? user.email ?? 'User',
              email: user.email ?? '',
              role: 'student',
            });
          }
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signUp = useCallback<AuthContextValue['signUp']>(
    async ({ email, password, fullName, role, ageGroup }) => {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateAuthProfile(cred.user, { displayName: fullName });
      const safeRole = role === 'admin' ? 'coach' : role;
      const newProfile: Omit<Profile, 'uid'> = {
        full_name: fullName,
        email,
        // Public sign-up creates coaches, and they must be APPROVED by the
        // admin before they can access anything.
        role: safeRole,
        status: safeRole === 'coach' ? 'pending' : 'approved',
        age_group: ageGroup ?? null,
        is_active: true,
        created_at: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', cred.user.uid), newProfile);
      setProfile({ uid: cred.user.uid, ...newProfile });
    },
    []
  );

  const refreshProfile = useCallback(async () => {
    const user = auth?.currentUser;
    if (!user) return;
    const snap = await getDoc(doc(db, 'users', user.uid));
    if (snap.exists()) setProfile({ uid: user.uid, ...(snap.data() as Omit<Profile, 'uid'>) });
  }, []);

  const signOutUser = useCallback(async () => {
    await signOut(auth);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  }, []);

  const value: AuthContextValue = {
    firebaseUser,
    profile,
    role: profile?.role ?? null,
    // Legacy profiles without a status field count as approved.
    status: profile ? (profile.status ?? 'approved') : null,
    loading,
    configured: isFirebaseConfigured,
    refreshProfile,
    signIn,
    signUp,
    signOutUser,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
