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

import { StudentProfile, AssessmentResult } from './types';
import {
  getMockUser,
  saveMockUser,
  clearMockUser,
  getMockAssessments,
  saveMockAssessment,
  isConfigured as isSupabaseConfiguredInitial
} from './lib/supabase';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'home' | 'quiz' | 'direct' | 'universities' | 'careers' | 'dashboard'
  >('home');

  const [currentUser, setCurrentUser] = useState<StudentProfile | null>(null);
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [assessmentsList, setAssessmentsList] = useState<AssessmentResult[]>([]);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(isSupabaseConfiguredInitial);

  // Initialize user and assessment history from local storage / Supabase mirror
  useEffect(() => {
    const user = getMockUser();
    if (user) {
      setCurrentUser(user);
      const pastAssessments = getMockAssessments(user.id);
      setAssessmentsList(pastAssessments);
    } else {
      // Default demo student profile for immediate seamless exploration
      const guestStudent: StudentProfile = {
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
      saveMockUser(guestStudent);
      setCurrentUser(guestStudent);
      const pastAssessments = getMockAssessments(guestStudent.id);
      setAssessmentsList(pastAssessments);
    }
  }, []);

  const handleAssessmentComplete = (result: AssessmentResult) => {
    if (currentUser) {
      result.userId = currentUser.id;
      result.userName = currentUser.name;
      // If user had no location or wants to sync
      if (result.preferredCountry && !currentUser.preferredCountry) {
        currentUser.preferredCountry = result.preferredCountry;
        currentUser.preferredCity = result.preferredCity;
        saveMockUser(currentUser);
      }
    }
    saveMockAssessment(result);
    setCurrentResult(result);
    setAssessmentsList((prev) => [result, ...prev]);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveCareer = (career: string) => {
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
    saveMockUser(updatedUser);
  };

  const handleSaveUniversity = (uniId: string) => {
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
    saveMockUser(updatedUser);
  };

  const handleLoginSuccess = (profile: StudentProfile) => {
    setCurrentUser(profile);
    saveMockUser(profile);
    const pastAssessments = getMockAssessments(profile.id);
    setAssessmentsList(pastAssessments);
  };

  const handleLogout = () => {
    clearMockUser();
    setCurrentUser(null);
    setAssessmentsList([]);
    setActiveTab('home');
  };

  const handleConfigUpdated = () => {
    const hasUrl = !!localStorage.getItem('pathcode_supabase_url');
    const hasKey = !!localStorage.getItem('pathcode_supabase_anon_key');
    setIsSupabaseConnected(hasUrl && hasKey);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50/40 via-sky-50/30 to-violet-50/40 text-slate-800 selection:bg-indigo-500/20 selection:text-indigo-900 transition-colors">
      {/* Top Bar Navigation */}
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
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 border border-indigo-150 shadow-2xs transition-colors"
                  >
                    <span>← Back to Home Overview</span>
                  </button>
                  <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                    Active Assessment Result
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
                />
              </div>
            ) : (
              <Hero
                onStartQuiz={() => setActiveTab('quiz')}
                onStartDirect={() => setActiveTab('direct')}
                onExploreUniversities={() => setActiveTab('universities')}
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
          />
        )}

        {/* Direct "I Know My Interest" Fast-Track */}
        {activeTab === 'direct' && (
          <DirectDecode
            savedCareers={currentUser?.savedCareers || []}
            onToggleSaveCareer={handleSaveCareer}
            savedUniversities={currentUser?.savedUniversities || []}
            onToggleSaveUniversity={handleSaveUniversity}
          />
        )}

        {/* University Explorer */}
        {activeTab === 'universities' && (
          <UniversityExplorer
            savedUniversities={currentUser?.savedUniversities || []}
            onToggleSaveUniversity={handleSaveUniversity}
            preferredCountry={currentUser?.preferredCountry}
            preferredCity={currentUser?.preferredCity}
          />
        )}

        {/* Career & Clusters Library */}
        {activeTab === 'careers' && (
          <CareerLibrary
            savedCareers={currentUser?.savedCareers || []}
            onToggleSaveCareer={handleSaveCareer}
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
            onUpdateProfile={(updated) => {
              setCurrentUser(updated);
              saveMockUser(updated);
            }}
            isSupabaseConnected={isSupabaseConnected}
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
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Supabase & RLS Setup Modal */}
      <SupabaseModal
        isOpen={isSupabaseOpen}
        onClose={() => setIsSupabaseOpen(false)}
        onConfigUpdated={handleConfigUpdated}
      />
    </div>
  );
}
