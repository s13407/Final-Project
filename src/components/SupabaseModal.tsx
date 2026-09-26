import React, { useState } from 'react';
import { supabaseUrl, supabaseKey, isConfigured, SUPABASE_RLS_SQL } from '../lib/supabase';
import { X, Database, ShieldCheck, Check, AlertCircle, Copy, ExternalLink } from 'lucide-react';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({
  isOpen,
  onClose,
  onConfigUpdated
}) => {
  const [url, setUrl] = useState(localStorage.getItem('pathcode_supabase_url') || supabaseUrl || '');
  const [anonKey, setAnonKey] = useState(localStorage.getItem('pathcode_supabase_anon_key') || supabaseKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      localStorage.setItem('pathcode_supabase_url', url.trim());
    } else {
      localStorage.removeItem('pathcode_supabase_url');
    }

    if (anonKey) {
      localStorage.setItem('pathcode_supabase_anon_key', anonKey.trim());
    } else {
      localStorage.removeItem('pathcode_supabase_anon_key');
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onConfigUpdated();
      onClose();
    }, 1200);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_RLS_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-indigo-150 bg-white p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3.5 border-b border-slate-150 pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 shadow-xs">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
              Supabase Storage & Row Level Security (RLS)
            </h2>
            <p className="text-xs text-slate-500">
              Manage database credentials, active connection, and RLS policies
            </p>
          </div>
        </div>

        {/* Status card in fresh colors */}
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700 font-semibold">Active Storage Backend:</span>
            <div className="flex items-center gap-1.5 font-bold">
              <span className={`h-2.5 w-2.5 rounded-full ${isConfigured ? 'bg-emerald-500 ring-2 ring-emerald-300' : 'bg-emerald-500'}`} />
              <span className="text-emerald-800">
                {isConfigured ? 'Live Supabase Cloud Connected' : 'Resilient In-Memory & Local Storage Mirror'}
              </span>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            PathCode runs completely out-of-the-box! All profiles and assessment results are safely persisted locally. You can optionally connect your live Supabase project below to synchronize records across devices.
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Supabase Project URL
            </label>
            <input
              type="url"
              placeholder="https://your-project-id.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Supabase Anon Public API Key
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all font-medium"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleCopySql}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              <Copy className="h-4 w-4" />
              <span>{copiedSql ? 'SQL Copied!' : 'Copy Supabase RLS Schema SQL'}</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-700 transition-colors"
            >
              {savedSuccess ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Config Saved!</span>
                </>
              ) : (
                <span>Save Credentials</span>
              )}
            </button>
          </div>
        </form>

        {/* RLS Overview Info */}
        <div className="mt-6 border-t border-slate-150 pt-5 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Row Level Security (RLS) Policy Specifications:</span>
          </div>
          <p>
            • <strong>profiles table</strong>: Encrypted user metadata (name, school, age, department, preferred study city/country). Only accessible by the matching <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono">auth.uid() = id</code>.
          </p>
          <p>
            • <strong>assessments table</strong>: Assessment history, location choices, and 60-question logs. Students can only query their own results (<code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono">auth.uid() = user_id</code>).
          </p>
        </div>
      </div>
    </div>
  );
};
