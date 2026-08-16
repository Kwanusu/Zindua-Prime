import React from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowLeft, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";

export default function TermsOfService() {
  const lastUpdated = "August 15, 2026";

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
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Terms of Service</h1>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Last updated: {lastUpdated}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          
          <div className="space-y-8">
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Welcome to <strong>ZinduaPrime</strong>. By creating an account or accessing our application hosting platform, you agree to comply with and be bound by the following Terms of Service.
            </p>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Section 1 */}
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <CheckCircle2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                1. Account Registration & Responsibilities
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                You must be at least 18 years old or possess legal corporate authority to enter into these terms. You are solely responsible for maintaining credentials confidentiality and all deployment actions occurring under your workspace keys.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <ShieldAlert className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                2. Acceptable Use Policy
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                When utilizing ZinduaPrime services, you agree not to engage in forbidden infrastructure behaviors, including:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-slate-600 dark:text-slate-400">
                <li>Executing unauthorized network vulnerability scraping or brute-force penetration tests.</li>
                <li>Deploying malicious cryptomining software or distributed denial-of-service (DDoS) bots.</li>
                <li>Hosting content that violates copyright laws, trade secrets, or data privacy acts.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <AlertTriangle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                3. SLA & Limitation of Liability
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                While ZinduaPrime maintains a 99.9% target Service Level Agreement (SLA), our application is provided on an "AS IS" basis. ZinduaPrime will not be liable for indirect, incidental, or consequential revenue loss resulting from service outages or third-party cloud provider failures.
              </p>
            </div>

            {/* Section 4 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Questions or Legal Concerns?</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Reach out to our legal compliance team at <a href="mailto:legal@zinduaprime.com" className="text-indigo-600 underline dark:text-indigo-400">legal@zinduaprime.com</a>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}