import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { DEPARTMENTS } from '../data/calipsData';
import { POPULAR_COUNTRIES, POPULAR_CITIES } from '../data/universitiesData';
import { X, User, Mail, Lock, Building, Calendar, Sparkles, AlertCircle, MapPin } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: StudentProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
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

    const profile: StudentProfile = {
      id: 'usr-' + Date.now(),
      name: name || email.split('@')[0],
      email,
      age: Number(age) || 18,
      school: school || 'Commecs College',
      department: department || DEPARTMENTS[0],
      preferredCountry: preferredCountry || 'Pakistan',
      preferredCity: preferredCity || 'Karachi',
      createdAt: new Date().toISOString(),
      savedCareers: [],
      savedUniversities: []
    };

    onLoginSuccess(profile);
    onClose();
  };

  const handleFillDemo = () => {
    setName('Ayesha Khan');
    setEmail('s13407@commecscollege.edu.pk');
    setPassword('DemoPass123!');
    setAge(18);
    setSchool('Commecs College');
    setDepartment('Computer Science & IT');
    setPreferredCountry('Pakistan');
    setPreferredCity('Karachi');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl border border-indigo-150 bg-white p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md mb-2">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl font-extrabold text-slate-900">
            {mode === 'signup' ? 'Student Registration' : 'Student Login'}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {mode === 'signup'
              ? 'Join PathCode to save your assessments, target universities, and dream city.'
              : 'Sign in to access your saved PathCodes and profile.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-5 flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
              mode === 'signup' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
              mode === 'login' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Log In
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800 font-semibold">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Khan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Age
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="number"
                      min={12}
                      max={90}
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    School / College
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Commecs College"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Department / Stream
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Study Location Preference in Registration */}
              <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-150 space-y-2">
                <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-wide flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-indigo-600" />
                  <span>Where are you looking for universities?</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <select
                      value={preferredCountry}
                      onChange={(e) => setPreferredCountry(e.target.value)}
                      className="w-full rounded-xl border border-indigo-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none"
                    >
                      {POPULAR_COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="City (e.g. Karachi, London)"
                      value={preferredCity}
                      onChange={(e) => setPreferredCity(e.target.value)}
                      className="w-full rounded-xl border border-indigo-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-3 text-xs font-bold text-white shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:scale-[1.01] active:scale-95 transition-all"
            >
              {mode === 'signup' ? 'Complete Registration' : 'Log In to Account'}
            </button>
          </div>
        </form>

        {/* Demo Fill Helper */}
        <div className="mt-4 pt-4 border-t border-slate-150 text-center">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
          >
            Quick Fill Demo Student Data
          </button>
        </div>
      </div>
    </div>
  );
};
