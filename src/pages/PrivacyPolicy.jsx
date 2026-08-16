import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Mail } from "lucide-react";

export default function PrivacyPolicy() {
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
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Privacy Policy</h1>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Last updated: {lastUpdated}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              At <strong>ZinduaPrime</strong>, we respect your privacy and are committed to safeguarding the personal data you share with us. This Privacy Policy outlines how we collect, use, store, and protect your information when you interact with our platform and services.
            </p>

            <hr className="my-8 border-slate-200 dark:border-slate-800" />

            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <Eye className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                1. Information We Collect
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                We collect personal information to provide and enhance our services. This includes:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-slate-600 dark:text-slate-400">
                <li><strong>Account Information:</strong> Name, email address, password, company name, and job title during account registration.</li>
                <li><strong>Payment & Billing Data:</strong> Credit card information and billing addresses processed through secure third-party payment gateways (e.g., Stripe).</li>
                <li><strong>Technical Usage Data:</strong> IP addresses, browser types, operating systems, referring URLs, and telemetry metrics while interacting with our cloud infrastructure.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <Lock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                2. How We Use Your Data
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Your data is processed strictly for legitimate business operational purposes:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-slate-600 dark:text-slate-400">
                <li>To provision, maintain, and monitor performance across user workspaces.</li>
                <li>To process billing transactions and generate automated invoicing records.</li>
                <li>To send operational updates, technical alerts, and security vulnerability notices.</li>
                <li>To prevent fraudulent activity, security breaches, or misuse of our system APIs.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                3. Your Rights & GDPR/CCPA Compliance
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Depending on your location, you hold specific data sovereignty rights:
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Right to Access & Portability</h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Request a full export of your personal stored records at any time in standard JSON format.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Right to Erasure</h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Request permanent deletion of your profile data and historical usage logs ("Right to be Forgotten").</p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="rounded-xl bg-indigo-50/60 p-6 dark:bg-indigo-950/40">
              <h2 className="flex items-center gap-2 text-lg font-bold text-indigo-900 dark:text-indigo-200">
                <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Data Protection Contact
              </h2>
              <p className="mt-2 text-sm text-indigo-800 dark:text-indigo-300">
                Have questions or privacy inquiries? Contact our dedicated Data Protection Officer at:
              </p>
              <a
                href="mailto:privacy@zinduaprime.com"
                className="mt-2 inline-block text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                privacy@zinduaprime.com
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}