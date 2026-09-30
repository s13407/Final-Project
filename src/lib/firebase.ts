import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  getDocFromServer,
  Firestore
} from 'firebase/firestore';
import { StudentProfile, AssessmentResult } from '../types';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App instance
export const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
export const auth: Auth = getAuth(app);

// Initialize Cloud Firestore with the configured Database ID
export const db: Firestore = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Validate Connection to Firestore (MANDATORY per skill specification)
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or still establishing connection.');
    }
    return false;
  }
}

// Auto-run connection test on module load
testConnection().catch(() => {});

// Session keys for keeping student session across page reloads
const SESSION_STORAGE_KEY_SESSION = 'pathcode_firebase_session_uid';
const LOCAL_STORAGE_KEY_USER = 'pathcode_current_user';
const LOCAL_STORAGE_LAST_EMAIL = 'pathcode_last_student_email';

export function hasActiveSession(): boolean {
  return Boolean(sessionStorage.getItem(SESSION_STORAGE_KEY_SESSION) || auth.currentUser);
}

export function getActiveSessionUserId(): string | null {
  return auth.currentUser?.uid || sessionStorage.getItem(SESSION_STORAGE_KEY_SESSION);
}

export function setActiveSession(userId: string): void {
  sessionStorage.setItem(SESSION_STORAGE_KEY_SESSION, userId);
}

export function clearActiveSession(): void {
  sessionStorage.removeItem(SESSION_STORAGE_KEY_SESSION);
  localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
}

export function getLastEmail(): string {
  return localStorage.getItem(LOCAL_STORAGE_LAST_EMAIL) || '';
}

export function setLastEmail(email: string): void {
  localStorage.setItem(LOCAL_STORAGE_LAST_EMAIL, email);
}

// -------------------------------------------------------------
// Firebase Auth: Student Registration (Sign Up)
// -------------------------------------------------------------
export async function signUpStudent(params: {
  email: string;
  password: string;
  name: string;
  age: number;
  school: string;
  department: string;
  preferredCountry: string;
  preferredCity: string;
}): Promise<{ profile: StudentProfile; error?: string }> {
  const cleanEmail = params.email.trim();
  const cleanPassword = params.password.trim();
  const cleanName = params.name.trim();

  if (!cleanEmail || !cleanPassword) {
    return { profile: null as any, error: 'Email and password are required.' };
  }

  if (cleanPassword.length < 6) {
    return { profile: null as any, error: 'Password must be at least 6 characters long.' };
  }

  try {
    // 1. Create Firebase Authentication user
    const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);
    const user = userCredential.user;

    // 2. Set Firebase User Display Name
    if (cleanName) {
      try {
        await updateProfile(user, { displayName: cleanName });
      } catch (e) {
        console.warn('Notice setting display name:', e);
      }
    }

    // 3. Build Student Profile Model
    const profile: StudentProfile = {
      id: user.uid,
      name: cleanName || cleanEmail.split('@')[0],
      email: cleanEmail,
      password: cleanPassword, // Stored locally for reference
      age: Number(params.age) || 18,
      school: params.school.trim() || 'College / University',
      department: params.department.trim() || 'Computer Science & IT',
      preferredCountry: params.preferredCountry || 'Pakistan',
      preferredCity: params.preferredCity || 'Karachi',
      createdAt: new Date().toISOString(),
      savedCareers: [],
      savedUniversities: []
    };

    // 4. Save User Profile in Firestore (/users/{userId})
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      age: profile.age,
      school: profile.school,
      department: profile.department,
      preferredCountry: profile.preferredCountry,
      preferredCity: profile.preferredCity,
      savedCareers: [],
      savedUniversities: [],
      createdAt: profile.createdAt,
      updatedAt: profile.createdAt
    });

    // 5. Update local session state
    setActiveSession(user.uid);
    setLastEmail(cleanEmail);
    localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(profile));

    return { profile };
  } catch (err: any) {
    console.error('Firebase sign up error:', err);
    let message = err.message || 'Failed to create account with Firebase.';
    if (err.code === 'auth/email-already-in-use') {
      message = 'An account with this email address already exists. Please log in.';
    } else if (err.code === 'auth/invalid-email') {
      message = 'Please enter a valid email address.';
    } else if (err.code === 'auth/weak-password') {
      message = 'Password is too weak. Please use at least 6 characters.';
    }
    return { profile: null as any, error: message };
  }
}

// -------------------------------------------------------------
// Firebase Auth: Student Sign In (Log In)
// -------------------------------------------------------------
export async function signInStudent(
  email: string,
  password: string
): Promise<{ profile: StudentProfile; error?: string }> {
  const cleanEmail = email.trim();
  const cleanPassword = password.trim();

  if (!cleanEmail) {
    return { profile: null as any, error: 'Please enter your registered email address.' };
  }
  if (!cleanPassword) {
    return { profile: null as any, error: 'Please enter your password.' };
  }

  try {
    // 1. Authenticate with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);
    const user = userCredential.user;

    // 2. Fetch User Profile from Firestore (/users/{userId})
    const userDocRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userDocRef);

    let profile: StudentProfile;
    if (snap.exists()) {
      const data = snap.data();
      profile = {
        id: user.uid,
        name: data.name || user.displayName || cleanEmail.split('@')[0],
        email: data.email || cleanEmail,
        password: cleanPassword,
        age: data.age || 18,
        school: data.school || 'College / University',
        department: data.department || 'Computer Science & IT',
        preferredCountry: data.preferredCountry || 'Pakistan',
        preferredCity: data.preferredCity || 'Karachi',
        savedCareers: data.savedCareers || [],
        savedUniversities: data.savedUniversities || [],
        createdAt: data.createdAt || new Date().toISOString()
      };
    } else {
      // Create user document if it didn't exist
      profile = {
        id: user.uid,
        name: user.displayName || cleanEmail.split('@')[0],
        email: cleanEmail,
        password: cleanPassword,
        age: 18,
        school: 'College / University',
        department: 'Computer Science & IT',
        preferredCountry: 'Pakistan',
        preferredCity: 'Karachi',
        createdAt: new Date().toISOString(),
        savedCareers: [],
        savedUniversities: []
      };
      await setDoc(userDocRef, {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        age: profile.age,
        school: profile.school,
        department: profile.department,
        preferredCountry: profile.preferredCountry,
        preferredCity: profile.preferredCity,
        savedCareers: [],
        savedUniversities: [],
        createdAt: profile.createdAt,
        updatedAt: profile.createdAt
      });
    }

    // 3. Update session
    setActiveSession(user.uid);
    setLastEmail(cleanEmail);
    localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(profile));

    return { profile };
  } catch (err: any) {
    console.error('Firebase sign in error:', err);
    let message = 'Invalid email or password. Please verify your credentials.';
    if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
      message = 'Invalid email or password. If you do not have an account yet, please sign up.';
    } else if (err.code === 'auth/too-many-requests') {
      message = 'Access temporarily disabled due to many failed login attempts. Please try again shortly.';
    } else if (err.code === 'auth/invalid-email') {
      message = 'Please enter a valid email address.';
    }
    return { profile: null as any, error: message };
  }
}

// -------------------------------------------------------------
// Firebase Auth: Sign Out
// -------------------------------------------------------------
export async function signOutStudent(): Promise<void> {
  try {
    await fbSignOut(auth);
  } catch (e) {
    console.warn('Notice signing out from Firebase:', e);
  }
  clearActiveSession();
}

// -------------------------------------------------------------
// Firestore: Sync & Retrieve Assessments
// -------------------------------------------------------------
export async function syncAssessmentToFirebase(result: AssessmentResult): Promise<void> {
  const currentUid = auth.currentUser?.uid || result.userId;
  if (!currentUid) return;

  try {
    const assessmentRef = doc(db, 'users', currentUid, 'assessments', result.id);
    await setDoc(assessmentRef, {
      id: result.id,
      userId: currentUid,
      userName: result.userName || 'Student',
      pathCode: result.pathCode,
      primaryArchetype: result.primaryArchetype || '',
      scores: result.scores || {},
      rankedCategories: result.rankedCategories || [],
      answers: result.answers || {},
      preferredCountry: result.preferredCountry || '',
      preferredCity: result.preferredCity || '',
      createdAt: result.createdAt || new Date().toISOString()
    });
  } catch (err) {
    console.error('Failed to sync assessment to Firestore:', err);
  }
}

export async function fetchUserAssessmentsFromFirebase(userId: string): Promise<AssessmentResult[]> {
  try {
    const colRef = collection(db, 'users', userId, 'assessments');
    const querySnapshot = await getDocs(colRef);
    const results: AssessmentResult[] = [];

    querySnapshot.forEach((docSnap) => {
      const d = docSnap.data();
      results.push({
        id: d.id,
        userId: d.userId,
        userName: d.userName,
        pathCode: d.pathCode,
        primaryArchetype: d.primaryArchetype || '',
        scores: d.scores || { C: 0, A: 0, L: 0, I: 0, P: 0, S: 0 },
        rankedCategories: d.rankedCategories || [],
        answers: d.answers || {},
        preferredCountry: d.preferredCountry,
        preferredCity: d.preferredCity,
        createdAt: d.createdAt || new Date().toISOString()
      });
    });

    // Sort newest first
    results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return results;
  } catch (err) {
    console.error('Failed to fetch user assessments from Firestore:', err);
    return [];
  }
}

// -------------------------------------------------------------
// Firestore: Sync Profile Updates & Bookmarks
// -------------------------------------------------------------
export async function syncProfileUpdateToFirebase(profile: StudentProfile): Promise<void> {
  const currentUid = auth.currentUser?.uid || profile.id;
  if (!currentUid) return;

  try {
    const userDocRef = doc(db, 'users', currentUid);
    await setDoc(
      userDocRef,
      {
        id: currentUid,
        name: profile.name,
        email: profile.email,
        age: profile.age,
        school: profile.school,
        department: profile.department,
        preferredCountry: profile.preferredCountry || '',
        preferredCity: profile.preferredCity || '',
        savedCareers: profile.savedCareers || [],
        savedUniversities: profile.savedUniversities || [],
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );

    localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to update profile in Firestore:', err);
  }
}

// -------------------------------------------------------------
// Firestore: Sync Direct Decode
// -------------------------------------------------------------
export async function syncDirectDecodeToFirebase(
  userId: string,
  decode: {
    interest: string;
    department: string;
    field: string;
    computedPathCode: string;
    primaryCategory: string;
    secondaryCategory: string;
    recommendedCareers: string[];
    recommendedMajors: string[];
    skillsToBuild: string[];
    clusters: string[];
  }
): Promise<void> {
  const currentUid = auth.currentUser?.uid || userId;
  if (!currentUid) return;

  try {
    const decodeId = 'dec-' + Date.now();
    const decodeRef = doc(db, 'users', currentUid, 'directDecodes', decodeId);
    await setDoc(decodeRef, {
      id: decodeId,
      userId: currentUid,
      ...decode,
      timestamp: Date.now()
    });
  } catch (err) {
    console.error('Failed to save direct decode to Firestore:', err);
  }
}

// Helper to get cached user profile
export function getCurrentUserProfile(): StudentProfile | null {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
