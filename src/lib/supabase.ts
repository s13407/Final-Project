import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { StudentProfile, AssessmentResult } from '../types';

// Retrieve credentials from environment or localStorage
const getStoredSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const localUrl = localStorage.getItem('pathcode_supabase_url');
  const localKey = localStorage.getItem('pathcode_supabase_anon_key');

  const supabaseUrl = localUrl || envUrl || '';
  const supabaseKey = localKey || envKey || '';

  return { supabaseUrl, supabaseKey, isConfigured: Boolean(supabaseUrl && supabaseKey) };
};

export const { supabaseUrl, supabaseKey, isConfigured } = getStoredSupabaseConfig();

// Initialize real Supabase client if configured
let realClient: SupabaseClient | null = null;
if (supabaseUrl && supabaseKey) {
  try {
    realClient = createClient(supabaseUrl, supabaseKey);
  } catch (err) {
    console.warn('Could not initialize Supabase client:', err);
  }
}

export const supabase = realClient;

// Local storage keys for resilient offline / instant mock operation
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
  // Also save to all profiles
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

// Complete Row Level Security (RLS) SQL Script for Supabase
export const SUPABASE_RLS_SQL = `-- PathCode Database Schema & Row Level Security (RLS) Policies
-- Run this in your Supabase SQL Editor (https://app.supabase.com)

-- 1. Create Profiles Table (Extending auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER CHECK (age >= 10 AND age <= 100),
  school TEXT NOT NULL,
  department TEXT NOT NULL,
  email TEXT NOT NULL,
  saved_careers TEXT[] DEFAULT '{}',
  saved_universities TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS) on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies:
-- Users can only read their own profile
CREATE POLICY "Users can read own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Users can insert their own profile on signup
CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);


-- 3. Create Assessments Table
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_name TEXT NOT NULL,
  path_code VARCHAR(10) NOT NULL,
  primary_archetype TEXT NOT NULL,
  scores JSONB NOT NULL,
  ranked_categories TEXT[] NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security on Assessments
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Assessments Policies:
-- Users can only view their own assessment records
CREATE POLICY "Users can view own assessments" 
ON public.assessments FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Users can only insert their own assessment records
CREATE POLICY "Users can insert own assessments" 
ON public.assessments FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Optional: Allow users to delete their past assessments
CREATE POLICY "Users can delete own assessments" 
ON public.assessments FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);

-- 5. Trigger for profile update timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
`;
