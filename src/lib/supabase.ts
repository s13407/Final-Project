import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { StudentProfile, AssessmentResult } from '../types';

// Retrieve credentials from environment or localStorage
export const getStoredSupabaseConfig = () => {
  const envUrl = (import.meta.env.VITE_SUPABASE_URL as string) || '';
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';
  const localUrl = localStorage.getItem('pathcode_supabase_url') || '';
  const localKey = localStorage.getItem('pathcode_supabase_anon_key') || '';

  const supabaseUrl = localUrl.trim() || envUrl.trim();
  const supabaseKey = localKey.trim() || envKey.trim();

  return {
    supabaseUrl,
    supabaseKey,
    isConfigured: Boolean(supabaseUrl && supabaseKey)
  };
};

let currentClient: SupabaseClient | null = null;
let currentConfig = getStoredSupabaseConfig();

export const getSupabase = (): SupabaseClient | null => {
  if (currentClient) return currentClient;
  const { supabaseUrl, supabaseKey } = currentConfig;
  if (supabaseUrl && supabaseKey) {
    try {
      currentClient = createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      });
    } catch (err) {
      console.warn('Could not initialize Supabase client:', err);
    }
  }
  return currentClient;
};

export const updateSupabaseCredentials = (url: string, key: string) => {
  const cleanUrl = url.trim();
  const cleanKey = key.trim();

  if (cleanUrl) {
    localStorage.setItem('pathcode_supabase_url', cleanUrl);
  } else {
    localStorage.removeItem('pathcode_supabase_url');
  }

  if (cleanKey) {
    localStorage.setItem('pathcode_supabase_anon_key', cleanKey);
  } else {
    localStorage.removeItem('pathcode_supabase_anon_key');
  }

  currentConfig = getStoredSupabaseConfig();
  currentClient = null;
  if (currentConfig.isConfigured) {
    currentClient = createClient(currentConfig.supabaseUrl, currentConfig.supabaseKey);
  }
};

export const testSupabaseConnection = async (): Promise<{
  success: boolean;
  message: string;
  hasProfilesTable: boolean;
  hasAssessmentsTable: boolean;
}> => {
  const client = getSupabase();
  if (!client) {
    return {
      success: false,
      message: 'Supabase URL or Anon Public Key is missing. Please add credentials.',
      hasProfilesTable: false,
      hasAssessmentsTable: false
    };
  }

  try {
    // Test basic connection by querying auth settings / profiles table
    let profilesOk = false;
    let assessmentsOk = false;

    const { error: profErr } = await client.from('profiles').select('id').limit(1);
    if (!profErr || profErr.code === 'PGRST116') {
      profilesOk = true;
    }

    const { error: assessErr } = await client.from('assessments').select('id').limit(1);
    if (!assessErr || assessErr.code === 'PGRST116') {
      assessmentsOk = true;
    }

    return {
      success: true,
      message: 'Successfully connected to live Supabase project!',
      hasProfilesTable: profilesOk,
      hasAssessmentsTable: assessmentsOk
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Failed to connect to Supabase server.',
      hasProfilesTable: false,
      hasAssessmentsTable: false
    };
  }
};

// -------------------------------------------------------------
// Local Storage mirror for offline resilience / guest mode
// -------------------------------------------------------------
const LOCAL_STORAGE_KEY_USER = 'pathcode_current_user';
const LOCAL_STORAGE_KEY_PROFILES = 'pathcode_mock_profiles';
const LOCAL_STORAGE_KEY_ASSESSMENTS = 'pathcode_mock_assessments';

export function getMockUser(): StudentProfile | null {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function saveMockUser(profile: StudentProfile): void {
  localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(profile));
  const profiles = getAllMockProfiles();
  profiles[profile.id] = profile;
  localStorage.setItem(LOCAL_STORAGE_KEY_PROFILES, JSON.stringify(profiles));
}

export function clearMockUser(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
}

function getAllMockProfiles(): Record<string, StudentProfile> {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_PROFILES);
  if (!data) return {};
  try {
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export function getMockAssessments(userId?: string): AssessmentResult[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_ASSESSMENTS);
  if (!data) return [];
  try {
    const list: AssessmentResult[] = JSON.parse(data);
    if (userId) {
      return list.filter((item) => item.userId === userId);
    }
    return list;
  } catch {
    return [];
  }
}

export function saveMockAssessment(result: AssessmentResult): void {
  const list = getMockAssessments();
  list.unshift(result);
  localStorage.setItem(LOCAL_STORAGE_KEY_ASSESSMENTS, JSON.stringify(list));
}

// -------------------------------------------------------------
// Real Supabase Auth & Database Operations
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
  const client = getSupabase();

  if (client) {
    try {
      // 1. Supabase Auth signup
      const { data: authData, error: authErr } = await client.auth.signUp({
        email: params.email,
        password: params.password,
        options: {
          data: {
            name: params.name,
            age: params.age,
            school: params.school,
            department: params.department,
            preferred_country: params.preferredCountry,
            preferred_city: params.preferredCity
          }
        }
      });

      if (authErr) {
        throw authErr;
      }

      const userId = authData.user?.id || 'usr-' + Date.now();

      // 2. Insert or Upsert into public.profiles
      const profile: StudentProfile = {
        id: userId,
        email: params.email,
        name: params.name,
        age: params.age,
        school: params.school,
        department: params.department,
        preferredCountry: params.preferredCountry,
        preferredCity: params.preferredCity,
        createdAt: new Date().toISOString(),
        savedCareers: [],
        savedUniversities: []
      };

      try {
        await client.from('profiles').upsert({
          id: userId,
          email: params.email,
          name: params.name,
          age: params.age,
          school: params.school,
          department: params.department,
          preferred_country: params.preferredCountry,
          preferred_city: params.preferredCity,
          saved_careers: [],
          saved_universities: [],
          updated_at: new Date().toISOString()
        });
      } catch (tableErr) {
        console.warn('Could not insert to public.profiles table, saved in local mirror:', tableErr);
      }

      saveMockUser(profile);
      return { profile };
    } catch (err: any) {
      console.warn('Supabase auth signup notice:', err.message);
      // Fallback with informative error or mock user
      return {
        profile: {
          id: 'usr-' + Date.now(),
          email: params.email,
          name: params.name,
          age: params.age,
          school: params.school,
          department: params.department,
          preferredCountry: params.preferredCountry,
          preferredCity: params.preferredCity,
          createdAt: new Date().toISOString(),
          savedCareers: [],
          savedUniversities: []
        },
        error: err?.message
      };
    }
  }

  // Pure local mirror fallback
  const fallbackProfile: StudentProfile = {
    id: 'usr-' + Date.now(),
    email: params.email,
    name: params.name,
    age: params.age,
    school: params.school,
    department: params.department,
    preferredCountry: params.preferredCountry,
    preferredCity: params.preferredCity,
    createdAt: new Date().toISOString(),
    savedCareers: [],
    savedUniversities: []
  };
  saveMockUser(fallbackProfile);
  return { profile: fallbackProfile };
}

export async function signInStudent(
  email: string,
  password: string
): Promise<{ profile: StudentProfile; error?: string }> {
  const client = getSupabase();

  if (client) {
    try {
      const { data: authData, error: authErr } = await client.auth.signInWithPassword({
        email,
        password
      });

      if (authErr) {
        throw authErr;
      }

      const user = authData.user;
      if (!user) throw new Error('User not found.');

      // Try fetching profile from profiles table
      let profile: StudentProfile | null = null;
      try {
        const { data: profData } = await client
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profData) {
          profile = {
            id: profData.id,
            email: profData.email,
            name: profData.name,
            age: profData.age,
            school: profData.school,
            department: profData.department,
            preferredCountry: profData.preferred_country || 'Pakistan',
            preferredCity: profData.preferred_city || 'Karachi',
            createdAt: profData.created_at,
            savedCareers: profData.saved_careers || [],
            savedUniversities: profData.saved_universities || []
          };
        }
      } catch {
        // Table not yet created
      }

      if (!profile) {
        const meta = user.user_metadata || {};
        profile = {
          id: user.id,
          email: user.email || email,
          name: meta.name || email.split('@')[0],
          age: meta.age || 18,
          school: meta.school || 'Commecs College',
          department: meta.department || 'Computer Science & IT',
          preferredCountry: meta.preferred_country || 'Pakistan',
          preferredCity: meta.preferred_city || 'Karachi',
          createdAt: user.created_at,
          savedCareers: [],
          savedUniversities: []
        };
      }

      saveMockUser(profile);
      return { profile };
    } catch (err: any) {
      return {
        profile: {
          id: 'usr-' + Date.now(),
          email,
          name: email.split('@')[0],
          age: 18,
          school: 'Commecs College',
          department: 'Computer Science & IT',
          createdAt: new Date().toISOString()
        },
        error: err?.message
      };
    }
  }

  // Local fallback
  const mockUser = getMockUser();
  if (mockUser && mockUser.email.toLowerCase() === email.toLowerCase()) {
    return { profile: mockUser };
  }

  const generatedProfile: StudentProfile = {
    id: 'usr-' + Date.now(),
    email,
    name: email.split('@')[0],
    age: 18,
    school: 'Commecs College',
    department: 'Computer Science & IT',
    preferredCountry: 'Pakistan',
    preferredCity: 'Karachi',
    createdAt: new Date().toISOString(),
    savedCareers: [],
    savedUniversities: []
  };
  saveMockUser(generatedProfile);
  return { profile: generatedProfile };
}

export async function syncAssessmentToSupabase(result: AssessmentResult): Promise<boolean> {
  saveMockAssessment(result);
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client.from('assessments').insert({
      id: result.id.startsWith('res-') ? undefined : result.id,
      user_id: result.userId || null,
      user_name: result.userName || 'Guest Student',
      path_code: result.pathCode,
      primary_archetype: result.primaryArchetype,
      scores: result.scores,
      ranked_categories: result.rankedCategories,
      answers: result.answers,
      preferred_country: result.preferredCountry || null,
      preferred_city: result.preferredCity || null,
      created_at: result.createdAt
    });

    if (error) {
      console.warn('Supabase assessment insert notice (safe local fallback used):', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase sync skipped, stored locally:', err);
    return false;
  }
}

export async function fetchUserAssessments(userId: string): Promise<AssessmentResult[]> {
  const localList = getMockAssessments(userId);
  const client = getSupabase();
  if (!client) return localList;

  try {
    const { data, error } = await client
      .from('assessments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return localList;
    }

    const fetchedList: AssessmentResult[] = data.map((row: any) => ({
      id: row.id,
      userId: row.user_id,
      userName: row.user_name,
      pathCode: row.path_code,
      primaryArchetype: row.primary_archetype,
      scores: row.scores,
      rankedCategories: row.ranked_categories,
      answers: row.answers || {},
      preferredCountry: row.preferred_country,
      preferredCity: row.preferred_city,
      createdAt: row.created_at
    }));

    return fetchedList;
  } catch {
    return localList;
  }
}

export async function syncProfileUpdate(profile: StudentProfile): Promise<boolean> {
  saveMockUser(profile);
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client.from('profiles').upsert({
      id: profile.id,
      email: profile.email,
      name: profile.name,
      age: Number(profile.age) || 18,
      school: profile.school,
      department: profile.department,
      preferred_country: profile.preferredCountry || null,
      preferred_city: profile.preferredCity || null,
      saved_careers: profile.savedCareers || [],
      saved_universities: profile.savedUniversities || [],
      updated_at: new Date().toISOString()
    });

    return !error;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// Complete Row Level Security (RLS) SQL Script for Supabase
// -------------------------------------------------------------
export const SUPABASE_RLS_SQL = `-- =========================================================
-- PathCode Career Guidance: Complete Database Schema & RLS
-- Run this in your Supabase SQL Editor (https://app.supabase.com)
-- =========================================================

-- 1. Create Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER CHECK (age >= 10 AND age <= 100),
  school TEXT NOT NULL,
  department TEXT NOT NULL,
  email TEXT NOT NULL,
  preferred_country TEXT DEFAULT 'Pakistan',
  preferred_city TEXT DEFAULT 'Karachi',
  saved_careers TEXT[] DEFAULT '{}',
  saved_universities TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS) on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow public read for profiles" ON public.profiles;

-- RLS Policies for Profiles
CREATE POLICY "Users can read own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);

-- 3. Create Assessments Table
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  path_code VARCHAR(10) NOT NULL,
  primary_archetype TEXT NOT NULL,
  scores JSONB NOT NULL,
  ranked_categories TEXT[] NOT NULL,
  answers JSONB NOT NULL,
  preferred_country TEXT,
  preferred_city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security on Assessments
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own assessments" ON public.assessments;
DROP POLICY IF EXISTS "Users can insert own assessments" ON public.assessments;
DROP POLICY IF EXISTS "Users can delete own assessments" ON public.assessments;
DROP POLICY IF EXISTS "Allow anon assessment inserts" ON public.assessments;

CREATE POLICY "Users can view own assessments" 
ON public.assessments FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments" 
ON public.assessments FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Allow guest/anon submissions if not signed in yet
CREATE POLICY "Allow anon assessment inserts" 
ON public.assessments FOR INSERT 
TO anon 
WITH CHECK (true);

-- 5. Trigger for profile updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_profile_updated ON public.profiles;
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
`;
