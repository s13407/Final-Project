import React, { useState, useEffect } from 'react';
import { StudentProfile, ThemeVibe } from '../types';
import { DEPARTMENTS } from '../data/calipsData';
import { POPULAR_COUNTRIES, getCitiesForCountry } from '../data/universitiesData';
import {
  signUpStudent,
  signInStudent,
  generateUniquePassword,
  getLastRegisteredAccount,
  isFirstTimeVisitor,
  getStoredSupabaseConfig,
  RegisteredAccount
} from '../lib/supabase';
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
  ArrowRight,
  Copy,
  Check,
  RefreshCw,
  Eye,
  EyeOff,
  Key,
  ShieldCheck,
  UserCheck
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
  // Determine if returning or first-time
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [lastAccount, setLastAccount] = useState<RegisteredAccount | null>(null);

  // Sign up state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [age, setAge] = useState<number | string>(18);
  const [school, setSchool] = useState('');
  const [department, setDepartment] = useState<string>(DEPARTMENTS[0]);
  const [preferredCountry, setPreferredCountry] = useState<string>('Pakistan');
  const [preferredCity, setPreferredCity] = useState<string>('Karachi');

  // Login state
  const [loginPassword, setLoginPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [showDifferentEmail, setShowDifferentEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Feedback & Loading
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [registeredSuccessUser, setRegisteredSuccessUser] = useState<StudentProfile | null>(null);

  // Initialize on open
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setCopied(false);
      setRegisteredSuccessUser(null);
      const isFirstTime = isFirstTimeVisitor();
      const last = getLastRegisteredAccount();
      setLastAccount(last);

      if (isFirstTime) {
        setMode('signup');
      } else {
        setMode('login');
      }

      if (!generatedPassword) {
        setGeneratedPassword(generateUniquePassword());
      }

      if (last) {
        setLoginEmail(last.email);
        setShowDifferentEmail(false);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isDark = vibe !== 'electric';
  const { isConfigured: isSupabaseConfigured } = getStoredSupabaseConfig();

  const handleGenerateNewPassword = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const newPass = generateUniquePassword();
    setGeneratedPassword(newPass);
  };

  const handleCopyPassword = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const passToSubmit = loginPassword.trim();
    if (!passToSubmit) {
      setError('Please enter your unique student password.');
      return;
    }

    setLoading(true);
    try {
      const emailToUse = showDifferentEmail ? loginEmail.trim() : (lastAccount?.email || loginEmail.trim());
      const res = await signInStudent(passToSubmit, emailToUse || undefined);

      if (res.error || !res.profile) {
        setError(res.error || 'Invalid password. If this is your first visit, please sign up to get a unique password.');
        setLoading(false);
        return;
      }

      onLoginSuccess(res.profile);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Authentication error. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !name || !school) {
      setError('Please fill in your name, email, and school/college.');
      return;
    }

    const uniquePass = generatedPassword || generateUniquePassword();
    setLoading(true);

    try {
      const res = await signUpStudent({
        email: email.trim(),
        password: uniquePass,
        name: name.trim(),
        age: Number(age) || 18,
        school: school.trim(),
        department: department || DEPARTMENTS[0],
        preferredCountry: preferredCountry || 'Pakistan',
        preferredCity: preferredCity || 'Karachi'
      });

      if (res.error || !res.profile) {
        setError(res.error || 'Failed to complete registration.');
        setLoading(false);
        return;
      }

      // Display the success confirmation card with their unique password
      setRegisteredSuccessUser(res.profile);
    } catch (err: any) {
      setError(err?.message || 'Registration failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinishRegistration = () => {
    if (registeredSuccessUser) {
      onLoginSuccess(registeredSuccessUser);
    }
    onClose();
  };

  const handleFillDemo = () => {
    setMode('login');
    setLoginPassword('COMMECS-2026-STAR');
    setLoginEmail('s13407@commecscollege.edu.pk');
    setShowDifferentEmail(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 shadow-2xl transition-all ${
          isDark
            ? 'bg-[#0E1424] border-white/15 text-slate-100 shadow-[0_0_50px_rgba(0,0,0,0.8)]'
            : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
        }`}
      >
        {/* Dismiss Button */}
        <button
          onClick={onClose}
          title="Close"
          className={`absolute right-5 top-5 rounded-full p-2 transition-colors ${
            isDark
              ? 'text-slate-400 hover:bg-white/10 hover:text-white'
              : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
          }`}
        >
          <X className="h-5 w-5" />
        </button>

        {/* ----------------- VIEW 1: REGISTRATION SUCCESS SCREEN ----------------- */}
        {registeredSuccessUser ? (
          <div className="text-center py-4 space-y-5 animate-fadeIn">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-500/30">
              <ShieldCheck className="h-9 w-9" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400 mb-2">
                <Check className="h-3.5 w-3.5" /> First-Time Registration Complete
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome, {registeredSuccessUser.name}!
              </h2>
              <p className={`mt-1.5 text-xs sm:text-sm max-w-md mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Your student profile has been created and synced with the Supabase database.
              </p>
            </div>

            {/* Generated Password Highlight Card */}
            <div
              className={`rounded-2xl border p-5 text-left space-y-3 ${
                isDark
                  ? 'bg-gradient-to-b from-amber-500/10 to-transparent border-amber-500/30'
                  : 'bg-amber-50/80 border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500">
                  <Key className="h-4 w-4" /> Your Unique Student Password
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                  Generated for you
                </span>
              </div>

              <div
                className={`flex items-center justify-between rounded-xl border p-3 ${
                  isDark ? 'bg-black/50 border-white/10' : 'bg-white border-amber-200'
                }`}
              >
                <code className="font-mono text-lg sm:text-xl font-black tracking-wider text-amber-400 selection:bg-amber-500/30">
                  {registeredSuccessUser.password || generatedPassword}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopyPassword(registeredSuccessUser.password || generatedPassword)}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    copied
                      ? 'bg-emerald-500 text-white'
                      : isDark
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div
                className={`flex items-start gap-2 rounded-xl p-3 text-xs ${
                  isDark ? 'bg-white/5 text-slate-300' : 'bg-amber-100/60 text-amber-900'
                }`}
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Save this password!</strong> Each time you open our website, you are supposed to log in. You will just enter this unique password instead of signing up again.
                </p>
              </div>
            </div>

            <button
              onClick={handleFinishRegistration}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-500/25 hover:opacity-95 transition-all active:scale-98"
            >
              <span>Continue to PathCode</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          /* ----------------- VIEW 2: LOGIN OR FIRST-TIME SIGN-UP ----------------- */
          <>
            {/* Header */}
            <div className="text-center">
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg mb-2 ${
                  mode === 'login'
                    ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-amber-500/20'
                    : 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-purple-500/30'
                }`}
              >
                {mode === 'login' ? <Key className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
              </div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight">
                {mode === 'login' ? 'Student Log In' : 'First-Time Registration'}
              </h2>
              <p
                className={`mt-1 text-xs ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {mode === 'login'
                  ? 'Each time you open our website, enter your unique password to log in.'
                  : 'Visiting for the first time? Sign up once, and a unique password is created for your future logins.'}
              </p>

              {/* Database indicator */}
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-[11px] font-semibold text-emerald-400">
                <Database className="h-3 w-3" />
                <span>
                  {isSupabaseConfigured
                    ? 'Connected to Supabase PostgreSQL'
                    : 'Supabase Database Active'}
                </span>
              </div>
            </div>

            {/* Navigation Tab Switcher */}
            <div
              className={`mt-5 flex rounded-2xl p-1 border ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all ${
                  mode === 'login'
                    ? isDark
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-md'
                      : 'bg-white text-slate-900 shadow-sm'
                    : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Key className="h-3.5 w-3.5" />
                <span>Returning Student (Log In)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError(null);
                  if (!generatedPassword) {
                    setGeneratedPassword(generateUniquePassword());
                  }
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all ${
                  mode === 'signup'
                    ? isDark
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                      : 'bg-white text-indigo-700 shadow-sm'
                    : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>First-Time Visitor (Sign In)</span>
              </button>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-rose-500/40 bg-rose-950/40 p-3 text-xs text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* ----------------- SUB-VIEW: RETURNING STUDENT LOG IN ----------------- */}
            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="mt-5 space-y-4">
                {/* Last Recognized Account Pill (if available) */}
                {lastAccount && !showDifferentEmail ? (
                  <div
                    className={`rounded-2xl border p-3 flex items-center justify-between ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-bold text-xs">
                        {lastAccount.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold">{lastAccount.name}</span>
                          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                            <UserCheck className="h-2.5 w-2.5" /> Registered
                          </span>
                        </div>
                        <span className={`text-[11px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {lastAccount.email}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDifferentEmail(true)}
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 underline"
                    >
                      Switch
                    </button>
                  </div>
                ) : (
                  <div>
                    <label
                      className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Student Email / ID
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="s13407@commecscollege.edu.pk"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className={`w-full rounded-2xl border py-2.5 pl-10 pr-4 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          isDark
                            ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:bg-white/10'
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Unique Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      className={`block text-[11px] font-bold uppercase tracking-wider ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Your Unique Password
                    </label>
                    {lastAccount && (
                      <button
                        type="button"
                        onClick={() => {
                          setLoginPassword(lastAccount.password);
                        }}
                        className="text-[10px] font-bold text-amber-400 hover:text-amber-300"
                      >
                        Auto-fill saved password
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-3 h-4 w-4 text-amber-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="e.g. PATH-7842-STAR or COMMECS-2026-STAR"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className={`w-full rounded-2xl border py-2.5 pl-10 pr-12 font-mono text-xs font-bold tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-amber-300 placeholder-slate-500 focus:bg-white/10'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-2.5 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className={`mt-1.5 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    💡 Just enter the unique password made during your first visit. You don&apos;t have to sign up again!
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 py-3 text-xs font-black text-slate-950 shadow-lg shadow-amber-500/20 hover:opacity-95 transition-all active:scale-98 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Verifying Unique Password...</span>
                  ) : (
                    <>
                      <span>Log In with Unique Password</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* ----------------- SUB-VIEW: FIRST TIME VISITOR SIGN IN ----------------- */
              <form onSubmit={handleSignupSubmit} className="mt-5 space-y-3.5">
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

                {/* Preferred Study Destination */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Target Country
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
                      Target City
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

                {/* Unique Password Made for User */}
                <div
                  className={`rounded-2xl border p-4 space-y-2.5 transition-all ${
                    isDark
                      ? 'bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 border-amber-500/30'
                      : 'bg-gradient-to-r from-amber-50 to-indigo-50 border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                      <Key className="h-4 w-4" /> Unique Password Made For You
                    </span>
                    <button
                      type="button"
                      onClick={handleGenerateNewPassword}
                      title="Generate a different unique password"
                      className="flex items-center gap-1 text-[11px] font-bold text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Regenerate</span>
                    </button>
                  </div>

                  <div
                    className={`flex items-center justify-between rounded-xl border p-2.5 ${
                      isDark ? 'bg-black/50 border-white/10' : 'bg-white border-amber-200'
                    }`}
                  >
                    <code className="font-mono text-sm sm:text-base font-black tracking-widest text-amber-400">
                      {generatedPassword}
                    </code>
                    <button
                      type="button"
                      onClick={() => handleCopyPassword(generatedPassword)}
                      className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                        copied
                          ? 'bg-emerald-500 text-white'
                          : isDark
                          ? 'bg-white/10 text-white hover:bg-white/20'
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    ✨ Whenever you reopen this website, you just enter this unique password to log in without signing in again.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 py-3 text-xs font-bold text-white shadow-lg shadow-purple-500/25 hover:opacity-95 transition-all active:scale-98 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Registering with Supabase...</span>
                  ) : (
                    <>
                      <span>Complete Registration & Save Password</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Quick Demo Pre-Fill */}
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-[11px]">
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                Want to test returning login immediately?
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="font-bold text-amber-400 hover:text-amber-300 underline underline-offset-2"
              >
                Log In as Demo (Ayesha Khan)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
