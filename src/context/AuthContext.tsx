'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isFirebaseActive: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  demoLoginAsAdmin: () => void;
  demoLoginAsUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ADMIN: UserProfile = {
  uid: 'admin_krushi_01',
  email: 'admin@damayantitechnologies.com',
  displayName: 'Krushi Admin',
  role: 'admin',
  preferredLanguage: 'en',
  favorites: ['paneer-butter-masala', 'masala-dosa'],
  history: [],
  createdAt: new Date().toISOString(),
};

const DEMO_USER: UserProfile = {
  uid: 'user_krushi_02',
  email: 'foodlover@cookwithkrushi.com',
  displayName: 'Priya Sharma',
  role: 'user',
  preferredLanguage: 'en',
  favorites: ['masala-dosa', 'gulab-jamun'],
  history: [],
  createdAt: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isFirebaseActive = isFirebaseConfigured() && Boolean(auth);

  useEffect(() => {
    // Check local storage for demo user
    const savedDemoUser = localStorage.getItem('cwk_demo_user');
    if (!isFirebaseActive) {
      if (savedDemoUser) {
        try {
          setUser(JSON.parse(savedDemoUser));
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
      return;
    }

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        // Fetch or create profile in Firestore
        try {
          if (db) {
            const userRef = doc(db, 'users', firebaseUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              setUser(userSnap.data() as UserProfile);
            } else {
              const newProfile: UserProfile = {
                uid: firebaseUser.uid,
                email: firebaseUser.email || '',
                displayName: firebaseUser.displayName || 'Home Cook',
                role: firebaseUser.email?.includes('admin') ? 'admin' : 'user',
                preferredLanguage: 'en',
                favorites: [],
                history: [],
                createdAt: new Date().toISOString(),
              };
              await setDoc(userRef, newProfile);
              setUser(newProfile);
            }
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Home Cook',
            role: 'user',
            preferredLanguage: 'en',
            favorites: [],
            history: [],
            createdAt: new Date().toISOString(),
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isFirebaseActive]);

  const loginWithEmail = async (email: string, pass: string) => {
    if (isFirebaseActive && auth) {
      await signInWithEmailAndPassword(auth, email, pass);
    } else {
      // Demo authentication
      const isAd = email.toLowerCase().includes('admin');
      const mockProfile: UserProfile = {
        uid: isAd ? DEMO_ADMIN.uid : 'user_' + Date.now(),
        email,
        displayName: isAd ? 'Krushi Admin' : email.split('@')[0],
        role: isAd ? 'admin' : 'user',
        preferredLanguage: 'en',
        favorites: ['paneer-butter-masala'],
        history: [],
        createdAt: new Date().toISOString(),
      };
      setUser(mockProfile);
      localStorage.setItem('cwk_demo_user', JSON.stringify(mockProfile));
    }
  };

  const registerWithEmail = async (name: string, email: string, pass: string) => {
    if (isFirebaseActive && auth && db) {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const newProfile: UserProfile = {
        uid: res.user.uid,
        email: res.user.email || email,
        displayName: name,
        role: email.includes('admin') ? 'admin' : 'user',
        preferredLanguage: 'en',
        favorites: [],
        history: [],
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', res.user.uid), newProfile);
      setUser(newProfile);
    } else {
      const mockProfile: UserProfile = {
        uid: 'user_' + Date.now(),
        email,
        displayName: name,
        role: email.includes('admin') ? 'admin' : 'user',
        preferredLanguage: 'en',
        favorites: [],
        history: [],
        createdAt: new Date().toISOString(),
      };
      setUser(mockProfile);
      localStorage.setItem('cwk_demo_user', JSON.stringify(mockProfile));
    }
  };

  const loginWithGoogle = async () => {
    if (isFirebaseActive && auth) {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } else {
      setUser(DEMO_USER);
      localStorage.setItem('cwk_demo_user', JSON.stringify(DEMO_USER));
    }
  };

  const logout = async () => {
    if (isFirebaseActive && auth) {
      await signOut(auth);
    }
    setUser(null);
    localStorage.removeItem('cwk_demo_user');
  };

  const resetPassword = async (email: string) => {
    if (isFirebaseActive && auth) {
      await sendPasswordResetEmail(auth, email);
    } else {
      // simulate success
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  };

  const demoLoginAsAdmin = () => {
    setUser(DEMO_ADMIN);
    localStorage.setItem('cwk_demo_user', JSON.stringify(DEMO_ADMIN));
  };

  const demoLoginAsUser = () => {
    setUser(DEMO_USER);
    localStorage.setItem('cwk_demo_user', JSON.stringify(DEMO_USER));
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        isFirebaseActive,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
        resetPassword,
        demoLoginAsAdmin,
        demoLoginAsUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
