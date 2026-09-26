import React, { useState, useEffect } from 'react';
import { CALIPS_QUESTIONS, CALIPS_CATEGORIES, calculateScores, rankCategories, getPathCodeTitle } from '../data/calipsData';
import { POPULAR_COUNTRIES, POPULAR_CITIES } from '../data/universitiesData';
import { CALIPSDimension, AssessmentResult } from '../types';
import confetti from 'canvas-confetti';
import { Check, X, ArrowLeft, ArrowRight, RotateCcw, Sparkles, MapPin, Globe, Compass, GraduationCap } from 'lucide-react';

interface AssessmentQuizProps {
  onComplete: (result: AssessmentResult) => void;
  onCancel: () => void;
  initialPreferredCountry?: string;
  initialPreferredCity?: string;
}

export const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({
  onComplete,
  onCancel,
  initialPreferredCountry = 'Anywhere / Global',
  initialPreferredCity = 'Any City / Flexible'
}) => {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preferred study location step state
  const [preferredCountry, setPreferredCountry] = useState(initialPreferredCountry);
  const [preferredCity, setPreferredCity] = useState(initialPreferredCity);
  const [customCity, setCustomCity] = useState('');
  const [showLocationStep, setShowLocationStep] = useState(false);

  const currentQuestion = CALIPS_QUESTIONS[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / CALIPS_QUESTIONS.length) * 100);

  // Keyboard navigation: T for true, F for false, Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (!showLocationStep) {
        if (e.key.toLowerCase() === 't') {
          handleAnswer(true);
        } else if (e.key.toLowerCase() === 'f') {
          handleAnswer(false);
        } else if (e.key === 'ArrowRight' && currentIndex < CALIPS_QUESTIONS.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, answers, showLocationStep]);

  const handleAnswer = (val: boolean) => {
    const qId = currentQuestion.id;
    setAnswers((prev) => ({ ...prev, [qId]: val }));

    if (currentIndex < CALIPS_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleTriggerLocationStep = () => {
    if (answeredCount < 30) {
      alert(`You have answered ${answeredCount} of 60 questions. Please answer at least 30 questions to get an accurate PathCode!`);
      return;
    }
    setShowLocationStep(true);
  };

  const handleFinishWithLocation = () => {
    const scores = calculateScores(answers);
    const ranked = rankCategories(scores);
    const top3 = ranked.slice(0, 3).join('');
    const primaryTitle = getPathCodeTitle(top3);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    const finalCity = customCity.trim() || preferredCity;

    const result: AssessmentResult = {
      id: 'res-' + Date.now(),
      createdAt: new Date().toISOString(),
      scores,
      rankedCategories: ranked,
      pathCode: top3,
      primaryArchetype: primaryTitle,
      answers,
      preferredCountry,
      preferredCity: finalCity
    };

    onComplete(result);
  };

  // Quick Demo Auto-Fill (useful for testing or exploration)
  const handleQuickDemoFill = (bias: CALIPSDimension = 'I') => {
    const demoAnswers: Record<number, boolean> = {};
    CALIPS_QUESTIONS.forEach((q) => {
      if (q.category === bias) {
        demoAnswers[q.id] = Math.random() > 0.15;
      } else if (q.category === 'A' || q.category === 'L') {
        demoAnswers[q.id] = Math.random() > 0.35;
      } else {
        demoAnswers[q.id] = Math.random() > 0.55;
      }
    });
    setAnswers(demoAnswers);
  };

  const currentCatInfo = CALIPS_CATEGORIES[currentQuestion.category];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Quiz Top Action & Progress Bar in Clean, Eye-Refreshing Card */}
      <div className="rounded-3xl border border-indigo-100 bg-white/95 p-6 sm:p-7 shadow-lg backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CALIPS 60-Question Assessment</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="font-mono text-slate-500">True / False</span>
            </div>
            <h2 className="font-display mt-1 text-2xl font-extrabold text-slate-900">
              Discover Your 3-Letter PathCode
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuickDemoFill('I')}
              title="Quickly fill with sample responses for immediate exploration"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-150 transition-colors"
            >
              Demo Auto-Fill
            </button>
            <button
              onClick={onCancel}
              className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Progress Bar & Numerical Tally with Vibrant Gradients */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2 font-mono">
            <span>
              Question <strong className="text-slate-900 font-bold text-sm tabular-nums">{currentIndex + 1}</strong> of 60
            </span>
            <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              {answeredCount} / 60 Answered ({progressPercent}%)
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-150 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-600 transition-all duration-300 shadow-sm"
              style={{ width: `${(answeredCount / 60) * 100}%` }}
            />
          </div>
        </div>

        {/* Category Jumpers / Segmented Progress Indicators */}
        <div className="mt-5 flex flex-wrap gap-2">
          {(['C', 'A', 'L', 'I', 'P', 'S'] as CALIPSDimension[]).map((cat) => {
            const catInfo = CALIPS_CATEGORIES[cat];
            const catQuestions = CALIPS_QUESTIONS.filter((q) => q.category === cat);
            const answeredInCat = catQuestions.filter((q) => answers[q.id] !== undefined).length;
            const isCurrent = currentQuestion.category === cat;

            return (
              <button
                key={cat}
                onClick={() => {
                  setShowLocationStep(false);
                  const firstIdx = CALIPS_QUESTIONS.findIndex((q) => q.category === cat);
                  if (firstIdx !== -1) setCurrentIndex(firstIdx);
                }}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="font-bold">{cat}</span>
                <span className="hidden sm:inline">{catInfo.archetype}</span>
                <span className="font-mono text-[10px] opacity-80">({answeredInCat}/10)</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: Either the Question Card OR the Study Location Preference Step */}
      {!showLocationStep ? (
        <div className="mt-6 rounded-3xl border border-indigo-100 bg-white p-8 sm:p-10 shadow-xl">
          {/* Dimension Header Banner */}
          <div className="flex items-center justify-between border-b border-slate-150 pb-5">
            <div className="flex items-center gap-3.5">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl font-display text-xl font-bold text-white shadow-md"
                style={{ backgroundColor: currentCatInfo.accentColor }}
              >
                {currentQuestion.category}
              </div>
              <div>
                <div className="text-xs font-bold tracking-wider uppercase text-slate-400">
                  Dimension {currentQuestion.category} · {currentCatInfo.title}
                </div>
                <div className="text-base font-bold text-slate-900">
                  {currentCatInfo.archetype}
                </div>
              </div>
            </div>

            <div className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full hidden sm:block">
              {currentCatInfo.tagline}
            </div>
          </div>

          {/* Question Statement */}
          <div className="py-10 text-center sm:py-14">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-150">
              Question #{currentQuestion.id}
            </span>
            <h3 className="font-display mt-5 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl leading-snug [text-wrap:balance]">
              "{currentQuestion.text}"
            </h3>
            <p className="mt-4 text-xs font-medium text-slate-500">
              Choose the response that feels true to you right now. Keyboard shortcut: Press <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-mono text-[11px]">T</kbd> for True, <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-mono text-[11px]">F</kbd> for False.
            </p>
          </div>

          {/* Joyful, High-Contrast True / False Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* True Button */}
            <button
              onClick={() => handleAnswer(true)}
              className={`group relative flex items-center justify-center gap-3.5 rounded-2xl border-2 p-5 text-base font-bold transition-all duration-200 active:scale-98 ${
                answers[currentQuestion.id] === true
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md shadow-emerald-500/15 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/40 text-slate-800 shadow-xs'
              }`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs group-hover:scale-110 transition-transform">
                <Check className="h-5 w-5 stroke-[2.5]" />
              </div>
              <span>Yes, this sounds like me (True)</span>
              <span className="hidden sm:inline font-mono text-xs text-slate-400 ml-auto border border-slate-200 bg-white rounded-md px-2 py-0.5 shadow-2xs">
                T
              </span>
            </button>

            {/* False Button */}
            <button
              onClick={() => handleAnswer(false)}
              className={`group relative flex items-center justify-center gap-3.5 rounded-2xl border-2 p-5 text-base font-bold transition-all duration-200 active:scale-98 ${
                answers[currentQuestion.id] === false
                  ? 'border-rose-500 bg-rose-50 text-rose-900 shadow-md shadow-rose-500/15 ring-2 ring-rose-500/20'
                  : 'border-slate-200 bg-white hover:border-rose-400 hover:bg-rose-50/40 text-slate-800 shadow-xs'
              }`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white shadow-xs group-hover:scale-110 transition-transform">
                <X className="h-5 w-5 stroke-[2.5]" />
              </div>
              <span>No, not really for me (False)</span>
              <span className="hidden sm:inline font-mono text-xs text-slate-400 ml-auto border border-slate-200 bg-white rounded-md px-2 py-0.5 shadow-2xs">
                F
              </span>
            </button>
          </div>

          {/* Step Navigation Controls */}
          <div className="mt-10 flex items-center justify-between border-t border-slate-150 pt-6">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous Question</span>
            </button>

            <div className="flex items-center gap-3">
              {answeredCount >= 30 ? (
                <button
                  onClick={handleTriggerLocationStep}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <MapPin className="h-4 w-4 text-amber-300" />
                  <span>Next: Choose Study Location ({answeredCount}/60)</span>
                </button>
              ) : (
                <span className="text-xs font-medium text-slate-500 bg-slate-150 px-3 py-1.5 rounded-full">
                  Answer {30 - answeredCount} more questions to finish
                </span>
              )}
            </div>

            <button
              disabled={currentIndex === CALIPS_QUESTIONS.length - 1}
              onClick={() => setCurrentIndex((prev) => Math.min(CALIPS_QUESTIONS.length - 1, prev + 1))}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
            >
              <span>Next Question</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Location Preference Step: Catchy, Mood-Brightening & Clean */
        <div className="mt-6 rounded-3xl border border-indigo-200 bg-white p-8 sm:p-10 shadow-2xl animate-fadeIn">
          <div className="flex items-center gap-3 border-b border-slate-150 pb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 text-white shadow-md">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Final Step Before Results
              </span>
              <h3 className="font-display text-2xl font-extrabold text-slate-900">
                Where are you looking for universities?
              </h3>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            Tell us in which <strong>city or country</strong> you want to study. PathCode will prioritize universities and campuses located right where you want to be!
          </p>

          <div className="mt-8 space-y-6">
            {/* Preferred Country */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Target Country
              </label>
              <select
                value={preferredCountry}
                onChange={(e) => setPreferredCountry(e.target.value)}
                className="w-full rounded-2xl border-2 border-indigo-150 bg-slate-50/80 px-4 py-3.5 text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
              >
                {POPULAR_COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred City Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                2. Target City / Region
              </label>

              {/* Popular City Quick-Select Chips */}
              <div className="flex flex-wrap gap-2 mb-3">
                {POPULAR_CITIES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setPreferredCity(city);
                      setCustomCity('');
                    }}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                      preferredCity === city && !customCity
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* Custom City Input */}
              <div className="relative mt-2">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Or type any specific city (e.g. Karachi, Peshawar, Manchester, Chicago, Sydney)..."
                  value={customCity}
                  onChange={(e) => {
                    setCustomCity(e.target.value);
                  }}
                  className="w-full rounded-2xl border-2 border-indigo-150 bg-slate-50/80 pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-10 flex items-center justify-between border-t border-slate-150 pt-6">
            <button
              onClick={() => setShowLocationStep(false)}
              className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Assessment</span>
            </button>

            <button
              onClick={handleFinishWithLocation}
              className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Reveal My PathCode & Tailored Universities</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
