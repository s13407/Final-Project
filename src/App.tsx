import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AssessmentQuiz } from './components/AssessmentQuiz';
import { ResultsView } from './components/ResultsView';
import { DirectDecode } from './components/DirectDecode';
import { UniversityExplorer } from './components/UniversityExplorer';
import { CareerLibrary } from './components/CareerLibrary';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { SupabaseModal } from './components/SupabaseModal';
import { Footer } from './components/Footer';

import { StudentProfile, AssessmentResult, ThemeVibe } from './types';
import {
  getMockUser,
  saveMockUser,
  clearMockUser,
  getMockAssessments,
  saveMockAssessment,
  syncAssessmentToSupabase,
  syncProfileUpdate,
  fetchUserAssessments,
  getStoredSupabaseConfig
} from './lib/supabase';
import { Sparkles, Database, Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'home' | 'quiz' | 'direct' | 'universities' | 'careers' | 'dashboard'
  >('home');

  // Aesthetic Theme Vibe: default to 'cosmic' (electric obsidian neon) or student preference
  const [vibe, setVibe] = useState<ThemeVibe>(() => {
    const saved = localStorage.getItem('pathcode_theme_vibe') as ThemeVibe;
    return saved === 'electric' || saved === 'emerald' ? saved : 'cosmic';
  });

  const [currentUser, setCurrentUser] = useState<StudentProfile | null>(null);
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [assessmentsList, setAssessmentsList] = useState<AssessmentResult[]>([]);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(() => {
    return getStoredSupabaseConfig().isConfigured;
  });

  const handleSelectVibe = (newVibe: ThemeVibe) => {
    setVibe(newVibe);
    localStorage.setItem('pathcode_theme_vibe', newVibe);
  };

  // Initialize student profile & fetch assessments (with Supabase sync)
  useEffect(() => {
    const initData = async () => {
      let user = getMockUser();
      if (!user) {
        // Default verified student profile for instant evaluation
        const demoStudent: StudentProfile = {
          id: 'usr-demo-1',
          name: 'Ayesha Khan',
          email: 's13407@commecscollege.edu.pk',
          age: 18,
          school: 'Commecs College',
          department: 'Computer Science & IT',
          preferredCountry: 'Pakistan',
          preferredCity: 'Karachi',
          createdAt: new Date().toISOString(),
          savedCareers: ['Software or AI/ML Engineer', 'Data Scientist / Data Analyst'],
          savedUniversities: ['prog-pk-1', 'prog-pk-2', 'prog-pk-6']
        };
        saveMockUser(demoStudent);
        user = demoStudent;
      }

      setCurrentUser(user);

      // Fetch assessments (from Supabase if configured, or local mirror)
      try {
        const list = await fetchUserAssessments(user.id);
        setAssessmentsList(list);
      } catch {
        setAssessmentsList(getMockAssessments(user.id));
      }
    };

    initData();
  }, []);

  const handleAssessmentComplete = async (result: AssessmentResult) => {
    if (currentUser) {
      result.userId = currentUser.id;
      result.userName = currentUser.name;

      if (result.preferredCountry && !currentUser.preferredCountry) {
        currentUser.preferredCountry = result.preferredCountry;
        currentUser.preferredCity = result.preferredCity;
        await syncProfileUpdate(currentUser);
      }
    }

    // Save locally and sync to Supabase database
    await syncAssessmentToSupabase(result);

    setCurrentResult(result);
    setAssessmentsList((prev) => [result, ...prev]);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveCareer = async (career: string) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }

    const currentSaved = currentUser.savedCareers || [];
    let updated: string[];
    if (currentSaved.includes(career)) {
      updated = currentSaved.filter((c) => c !== career);
    } else {
      updated = [...currentSaved, career];
    }

    const updatedUser = { ...currentUser, savedCareers: updated };
    setCurrentUser(updatedUser);
    await syncProfileUpdate(updatedUser);
  };

  const handleSaveUniversity = async (uniId: string) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }

    const currentSaved = currentUser.savedUniversities || [];
    let updated: string[];
    if (currentSaved.includes(uniId)) {
      updated = currentSaved.filter((u) => u !== uniId);
    } else {
      updated = [...currentSaved, uniId];
    }

    const updatedUser = { ...currentUser, savedUniversities: updated };
    setCurrentUser(updatedUser);
    await syncProfileUpdate(updatedUser);
  };

  const handleLoginSuccess = async (profile: StudentProfile) => {
    setCurrentUser(profile);
    const list = await fetchUserAssessments(profile.id);
    setAssessmentsList(list);
  };

  const handleLogout = () => {
    clearMockUser();
    setCurrentUser(null);
    setAssessmentsList([]);
    setActiveTab('home');
  };

  const handleConfigUpdated = () => {
    const config = getStoredSupabaseConfig();
    setIsSupabaseConnected(config.isConfigured);
  };

  // Determine container classes according to active vibe
  const containerClasses =
    vibe === 'cosmic'
      ? 'bg-[#090D16] text-slate-100 cosmic-mesh selection:bg-purple-500/30 selection:text-purple-200'
      : vibe === 'emerald'
      ? 'bg-[#07110F] text-slate-100 emerald-mesh selection:bg-emerald-500/30 selection:text-emerald-200'
      : 'bg-[#F8FAFC] text-slate-900 electric-mesh selection:bg-indigo-500/20 selection:text-indigo-950';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${containerClasses}`}>
      {/* Top Bar Navigation with Vibe Selector and Supabase Status */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSupabaseModal={() => setIsSupabaseOpen(true)}
        onLogout={handleLogout}
        isSupabaseConnected={isSupabaseConnected}
        vibe={vibe}
        onSelectVibe={handleSelectVibe}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If user has an active assessment result on home tab, display it, else show Hero */}
        {activeTab === 'home' && (
          <>
            {currentResult ? (
              <div className="space-y-6 pt-6 animate-fadeIn">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentResult(null)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold border transition-colors ${
                      vibe === 'cosmic' || vibe === 'emerald'
                        ? 'bg-white/10 border-white/15 text-purple-300 hover:bg-white/15'
                        : 'bg-white border-slate-200 text-indigo-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>← Back to Overview</span>
                  </button>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                      vibe === 'cosmic' || vibe === 'emerald'
                        ? 'bg-white/5 border-white/10 text-slate-300'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Active CALIPS Result ({currentResult.pathCode})
                  </span>
                </div>
                <ResultsView
                  result={currentResult}
                  onRetake={() => {
                    setCurrentResult(null);
                    setActiveTab('quiz');
                  }}
                  savedCareers={currentUser?.savedCareers || []}
                  onToggleSaveCareer={handleSaveCareer}
                  savedUniversities={currentUser?.savedUniversities || []}
                  onToggleSaveUniversity={handleSaveUniversity}
                  vibe={vibe}
                />
              </div>
            ) : (
              <Hero
                onStartQuiz={() => setActiveTab('quiz')}
                onStartDirect={() => setActiveTab('direct')}
                onExploreUniversities={() => setActiveTab('universities')}
                vibe={vibe}
              />
            )}
          </>
        )}

        {/* 60-Question CALIPS Assessment */}
        {activeTab === 'quiz' && (
          <AssessmentQuiz
            onComplete={handleAssessmentComplete}
            onCancel={() => setActiveTab('home')}
            initialPreferredCountry={currentUser?.preferredCountry || 'Pakistan'}
            initialPreferredCity={currentUser?.preferredCity || 'Karachi'}
            vibe={vibe}
          />
        )}

        {/* Direct "I Know My Interest" Fast-Track */}
        {activeTab === 'direct' && (
          <DirectDecode
            savedCareers={currentUser?.savedCareers || []}
            onToggleSaveCareer={handleSaveCareer}
            savedUniversities={currentUser?.savedUniversities || []}
            onToggleSaveUniversity={handleSaveUniversity}
            vibe={vibe}
          />
        )}

        {/* University Explorer */}
        {activeTab === 'universities' && (
          <UniversityExplorer
            savedUniversities={currentUser?.savedUniversities || []}
            onToggleSaveUniversity={handleSaveUniversity}
            preferredCountry={currentUser?.preferredCountry}
            preferredCity={currentUser?.preferredCity}
            vibe={vibe}
          />
        )}

        {/* Career & Clusters Library */}
        {activeTab === 'careers' && (
          <CareerLibrary
            savedCareers={currentUser?.savedCareers || []}
            onToggleSaveCareer={handleSaveCareer}
            vibe={vibe}
          />
        )}

        {/* Student Dashboard */}
        {activeTab === 'dashboard' && currentUser && (
          <Dashboard
            currentUser={currentUser}
            assessments={assessmentsList}
            onSelectAssessment={(res) => {
              setCurrentResult(res);
              setActiveTab('home');
            }}
            onOpenSupabaseModal={() => setIsSupabaseOpen(true)}
            onStartQuiz={() => setActiveTab('quiz')}
            onUpdateProfile={async (updated) => {
              setCurrentUser(updated);
              await syncProfileUpdate(updated);
            }}
            isSupabaseConnected={isSupabaseConnected}
            vibe={vibe}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupabase={() => setIsSupabaseOpen(true)}
        vibe={vibe}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        vibe={vibe}
      />

      {/* Supabase & RLS Setup Modal */}
      <SupabaseModal
        isOpen={isSupabaseOpen}
        onClose={() => setIsSupabaseOpen(false)}
        onConfigUpdated={handleConfigUpdated}
        vibe={vibe}
      />
    </div>
  );
}
