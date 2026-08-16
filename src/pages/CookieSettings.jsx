import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, ArrowLeft, Check, ShieldCheck, BarChart, Sliders } from "lucide-react";

export default function CookieSettings() {
  const [preferences, setPreferences] = useState({
    essential: true, // Always locked on
    analytics: true,
    functional: true,
    marketing: false,
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => {
    if (key === "essential") return; // Essential cookies cannot be turned off
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    // Save preferences logic (e.g., store in localStorage or cookie consent manager)
    localStorage.setItem("zindua_cookie_preferences", JSON.stringify(preferences));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAcceptAll = () => {
    const allOn = { essential: true, analytics: true, functional: true, marketing: true };
    setPreferences(allOn);
    localStorage.setItem("zindua_cookie_preferences", JSON.stringify(allOn));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Header Banner */}
      <div className="border-b border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Cookie className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Cookie Settings</h1>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Manage your cookie preferences and tracking consent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preference Center Container */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            We use cookies and similar technologies to help personalize your experience, analyze web performance, and tailor user preferences. You can adjust your preference categories below:
          </p>

          <div className="mt-8 space-y-6">
            
            {/* 1. Essential Cookies */}
            <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-950/50">
              <div className="flex gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-500" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Strictly Necessary Cookies</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    Required for basic site functionality, user authentication, session security, and load balancing. These cannot be disabled.
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                Always Active
              </span>
            </div>

            {/* 2. Analytics Cookies */}
            <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-5 dark:border-slate-800">
              <div className="flex gap-3">
                <BarChart className="mt-1 h-5 w-5 flex-shrink-0 text-indigo-500" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Analytics & Performance Cookies</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    Help us aggregate visitor counters and understand how users navigate our application, enabling us to optimize performance.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("analytics")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  preferences.analytics ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    preferences.analytics ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* 3. Functional Cookies */}
            <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-5 dark:border-slate-800">
              <div className="flex gap-3">
                <Sliders className="mt-1 h-5 w-5 flex-shrink-0 text-indigo-500" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Functional Preferences</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    Allow our system to remember custom choices you make (such as dark mode defaults, regional settings, and dashboard layouts).
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("functional")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  preferences.functional ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    preferences.functional ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* 4. Marketing Cookies */}
            <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-5 dark:border-slate-800">
              <div className="flex gap-3">
                <Cookie className="mt-1 h-5 w-5 flex-shrink-0 text-indigo-500" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Marketing & Targeted Advertising</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    Used by approved advertising partners to deliver personalized promotional offers across third-party websites.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("marketing")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  preferences.marketing ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    preferences.marketing ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

          </div>

          {/* Action Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
            <button
              onClick={handleAcceptAll}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Accept All Cookies
            </button>

            <div className="flex items-center gap-3">
              {saved && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <Check className="h-4 w-4" />
                  Preferences Saved!
                </span>
              )}
              <button
                onClick={handleSave}
                className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Save Preferences
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}