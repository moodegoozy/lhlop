// Firebase Authentication
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  User as FirebaseUser,
  UserCredential,
} from 'firebase/auth';
import { auth } from './config';
import { createUser, getUser } from './firestore';
import type { User, UserRole } from '@/types';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// ============ SIGN UP ============

export async function signUpWithEmail(
  email: string,
  password: string,
  userData: {
    full_name: string;
    role: UserRole;
    phone?: string;
  }
): Promise<User> {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const { user: firebaseUser } = credential;

  // Update display name
  await updateProfile(firebaseUser, { displayName: userData.full_name });

  // Send email verification
  await sendEmailVerification(firebaseUser);

  // Create user document in Firestore
  const newUser: Partial<User> = {
    email: firebaseUser.email!,
    full_name: userData.full_name,
    role: userData.role,
    phone: userData.phone,
    is_active: true,
    is_verified: false,
    avatar_url: firebaseUser.photoURL || undefined,
  };

  await createUser(firebaseUser.uid, newUser);

  return {
    ...newUser,
    id: firebaseUser.uid,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as User;
}

// ============ SIGN IN ============

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const user = await getUser(credential.user.uid);
  
  if (!user) {
    throw new Error('User data not found');
  }
  
  return user;
}

export async function signInWithGoogle(defaultRole: UserRole = 'student'): Promise<User> {
  const credential = await signInWithPopup(auth, googleProvider);
  const { user: firebaseUser } = credential;

  // Check if user exists
  let user = await getUser(firebaseUser.uid);

  if (!user) {
    // Create new user from Google data
    const newUser: Partial<User> = {
      email: firebaseUser.email!,
      full_name: firebaseUser.displayName || 'مستخدم',
      role: defaultRole,
      is_active: true,
      is_verified: firebaseUser.emailVerified,
      avatar_url: firebaseUser.photoURL || undefined,
    };

    await createUser(firebaseUser.uid, newUser);

    user = {
      ...newUser,
      id: firebaseUser.uid,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as User;
  }

  return user;
}

// ============ SIGN OUT ============

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

// ============ PASSWORD RESET ============

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

// ============ AUTH STATE ============

export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      callback(null);
      return;
    }

    try {
      const user = await getUser(firebaseUser.uid);
      callback(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      callback(null);
    }
  });
}

// ============ CURRENT USER ============

export function getCurrentFirebaseUser(): FirebaseUser | null {
  return auth.currentUser;
}

export async function getCurrentUser(): Promise<User | null> {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return null;
  return getUser(firebaseUser.uid);
}

// ============ VERIFY EMAIL ============

export async function resendVerificationEmail(): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('No user logged in');
  await sendEmailVerification(user);
}

// ============ UPDATE PROFILE ============

export async function updateUserProfile(data: {
  displayName?: string;
  photoURL?: string;
}): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('No user logged in');
  await updateProfile(user, data);
}
