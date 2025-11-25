/* eslint-disable react/jsx-no-useless-fragment */
"use client";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  GoogleAuthProvider,
} from 'firebase/auth';
import { firebaseAuth, googleProvider } from '../lib/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const loginWithGoogle = () =>
    signInWithPopup(firebaseAuth, googleProvider || new GoogleAuthProvider());

  const logout = () => signOut(firebaseAuth);

  const updateProfile = (name, photoURL) => {
    if (!firebaseAuth.currentUser) {
      return Promise.reject(new Error('No user is signed in'));
    }
    return firebaseUpdateProfile(firebaseAuth.currentUser, {
      displayName: name,
      photoURL: photoURL || null,
    });
  };

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      signup,
      login,
      loginWithGoogle,
      logout,
      updateProfile,
    }),
    [currentUser, loading],
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

export { AuthContext };
