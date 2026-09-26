import React, { useState } from 'react';
import { StudentProfile, ThemeVibe } from '../types';
import { DEPARTMENTS } from '../data/calipsData';
import { POPULAR_COUNTRIES, getCitiesForCountry } from '../data/universitiesData';
import { signUpStudent, signInStudent, getStoredSupabaseConfig } from '../lib/supabase';
import {
  X,
  User,
  Mail,
  Lock,
  Building,
  Calendar,
  Sparkles,
  AlertCircle,
  MapPin,
  Database,
  ArrowRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: StudentProfile) => void;
  vibe: ThemeVibe;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  vibe
}) => {
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState<number | string>(18);
  const [school, setSchool] = useState('');
  const [department, setDepartment] = useState<string>(DEPARTMENTS[0]);
  const [preferredCountry, setPreferredCountry] = useState<string>('Pakistan');
  const [preferredCity, setPreferredCity] = useState<string>('Karachi');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const isDark = vibe !== 'electric';
  const { isConfigured: isSupabaseConfigured } = getStoredSupabaseConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide your email and password.');
      return;
    }

    if (mode === 'signup' && (!name || !school)) {
      setError('Please fill out your name and school/college.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const res = await signUpStudent({
          email,
          password,
          name: name || email.split('@')[0],
          age: Number(age) || 18,
          school: school || 'College / University',
          department: department || DEPARTMENTS[0],
          preferredCountry: preferredCountry || 'Pakistan',
          preferredCity: preferredCity || 'Karachi'
        });

        if (res.error && !res.profile) {
          setError(res.error);
          setLoading(false);
          return;
        }

        onLoginSuccess(res.profile);
        onClose();
      } else {
        const res = await signInStudent(email, password);
        if (res.error && !res.profile) {
          setError(res.error);
          setLoading(false);
          return;
        }
        onLoginSuccess(res.profile);
        onClose();
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setName('Ayesha Khan');
    setEmail('s13407@commecscollege.edu.pk');
    setPassword('DemoStudent2026!');
    setAge(18);
    setSchool('Commecs College');
    setDepartment('Computer Science & IT');
    setPreferredCountry('Pakistan');
    setPreferredCity('Karachi');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 shadow-2xl transition-all ${
          isDark
            ? 'bg-[#0E1424] border-white/15 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute right-5 top-5 rounded-full p-2 transition-colors ${
            isDark
              ? 'text-slate-400 hover:bg-white/10 hover:text-white'
              : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
          }`}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 mb-2">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight">
            {mode === 'signup' ? 'Student Registration' : 'Student Sign In'}
          </h2>
          <p
            className={`mt-1 text-xs ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {mode === 'signup'
              ? 'Register with PathCode to sync assessments to your Supabase database.'
              : 'Sign in to access your saved PathCodes, universities, and profile.'}
          </p>

          {/* Database indicator */}
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-[11px] font-semibold text-emerald-400">
            <Database className="h-3 w-3" />
            <span>
              {isSupabaseConfigured
                ? 'Syncing with Live Supabase Project'
                : 'Supabase Database Ready'}
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div
          className={`mt-5 flex rounded-2xl p-1 border ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
              mode === 'signup'
                ? isDark
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-indigo-700 shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Create Student Account
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
              mode === 'login'
                ? isDark
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-indigo-700 shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Student Log In
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-rose-500/40 bg-rose-950/40 p-3 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {mode === 'signup' && (
            <>
              <div>
                <label
                  className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Khan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full rounded-2xl border py-2.5 pl-10 pr-4 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:bg-white/10'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Age
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="number"
                      min={12}
                      max={99}
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className={`w-full rounded-2xl border py-2.5 pl-10 pr-4 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-white focus:bg-white/10'
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    School / College
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Commecs College"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className={`w-full rounded-2xl border py-2.5 pl-10 pr-4 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:bg-white/10'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Current Stream / Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className={`w-full rounded-2xl border px-4 py-2.5 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDark
                      ? 'bg-[#141b2d] border-white/10 text-white focus:bg-[#182137]'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                  }`}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Study Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Study Country
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <select
                      value={preferredCountry}
                      onChange={(e) => {
                        setPreferredCountry(e.target.value);
                        const cities = getCitiesForCountry(e.target.value);
                        setPreferredCity(cities[0] || 'Any City');
                      }}
                      className={`w-full rounded-2xl border py-2.5 pl-10 pr-4 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        isDark
                          ? 'bg-[#141b2d] border-white/10 text-white focus:bg-[#182137]'
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                      }`}
                    >
                      {POPULAR_COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Study City
                  </label>
                  <select
                    value={preferredCity}
                    onChange={(e) => setPreferredCity(e.target.value)}
                    className={`w-full rounded-2xl border px-4 py-2.5 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDark
                        ? 'bg-[#141b2d] border-white/10 text-white focus:bg-[#182137]'
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                    }`}
                  >
                    {getCitiesForCountry(preferredCountry).map((city: string) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label
              className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="s13407@commecscollege.edu.pk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-2xl border py-2.5 pl-10 pr-4 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:bg-white/10'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                }`}
              />
            </div>
          </div>

          <div>
            <label
              className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full rounded-2xl border py-2.5 pl-10 pr-4 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:bg-white/10'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 py-3 text-xs font-bold text-white shadow-lg shadow-purple-500/25 hover:opacity-95 transition-all active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <span>Connecting to Supabase...</span>
            ) : mode === 'signup' ? (
              <>
                <span>Complete Registration & Save to Supabase</span>
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast-Fill */}
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-[11px]">
          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
            Testing? Pre-fill verified student details:
          </span>
          <button
            type="button"
            onClick={handleFillDemo}
            className="font-bold text-purple-400 hover:text-purple-300 underline underline-offset-2"
          >
            Auto-Fill Commecs Student
          </button>
        </div>
      </div>
    </div>
  );
};
