import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, HelpCircle, ArrowRight, Zap } from "lucide-react";

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Developer",
      badge: "Free Forever",
      priceMonthly: 0,
      priceAnnual: 0,
      description: "Ideal for personal projects, experiments, and hobby developers.",
      features: [
        "Up to 3 Active Projects",
        "10,000 API Requests / mo",
        "Community Discord Support",
        "Global CDN Edge Caching",
        "Standard SSL Certificate"
      ],
      cta: "Get Started Free",
      popular: false,
      link: "/register"
    },
    {
      name: "Pro",
      badge: "Most Popular",
      priceMonthly: 29,
      priceAnnual: 24,
      description: "For fast-growing startups and professional dev teams.",
      features: [
        "Unlimited Projects",
        "2,000,000 API Requests / mo",
        "Priority Email & Chat Support",
        "Advanced Analytics & Logging",
        "Custom Domains & Wildcard SSL",
        "Automated Daily Backups",
        "Team Role Permissions"
      ],
      cta: "Start 14-Day Free Trial",
      popular: true,
      link: "/register"
    },
    {
      name: "Enterprise",
      badge: "Custom Scale",
      priceMonthly: 199,
      priceAnnual: 159,
      description: "Mission-critical applications requiring custom SLA & dedicated resources.",
      features: [
        "Custom API Volume Limits",
        "99.99% Uptime SLA",
        "24/7/365 Dedicated Phone Support",
        "Custom SSO & SAML Integration",
        "SOC2 & HIPAA Compliance",
        "Dedicated Solutions Architect",
        "Custom VPC Peering"
      ],
      cta: "Contact Enterprise Sales",
      popular: false,
      link: "/contact"
    }
  ];

  const featureComparison = [
    { feature: "Edge Regions", dev: "3 Locations", pro: "All 120+ Edge Nodes", ent: "Dedicated Edge Deployments" },
    { feature: "Team Members", dev: "1 Member", pro: "Up to 10 Members", ent: "Unlimited Members" },
    { feature: "Log Retention", dev: "24 Hours", pro: "30 Days", ent: "365 Days" },
    { feature: "SLA Guarantee", dev: "Best Effort", pro: "99.9% Uptime", ent: "99.99% Uptime" },
    { feature: "Security Auditing", dev: "Basic", pro: "Advanced", ent: "Full Audit Logs & Webhooks" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Header */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-600/15" />
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Simple, Transparent Pricing
          </span>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Predictable costs. No surprise overages.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
            Choose the tier that fits your growth. Scale up or down anytime with zero friction.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold ${!annual ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none dark:bg-indigo-500"
              role="switch"
              aria-checked={annual}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  annual ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-semibold ${annual ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>
              Annual <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">Save 20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-3xl border p-8 transition-all hover:shadow-xl ${
                  plan.popular
                    ? "border-indigo-600 bg-white shadow-lg ring-2 ring-indigo-600 dark:border-indigo-500 dark:bg-slate-900 dark:ring-indigo-500"
                    : "border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        plan.popular
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      ${annual ? plan.priceAnnual : plan.priceMonthly}
                    </span>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">/ month</span>
                  </div>

                  <ul className="mt-8 space-y-3.5 text-sm">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 shrink-0 text-emerald-500" />
                        <span className="text-slate-700 dark:text-slate-300">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to={plan.link}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all ${
                      plan.popular
                        ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Matrix Table */}
          <div className="mt-20">
            <h3 className="text-center text-2xl font-bold text-slate-900 dark:text-white">Compare Plan Features</h3>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
                    <th className="p-4 font-bold">Feature</th>
                    <th className="p-4 font-bold">Developer</th>
                    <th className="p-4 font-bold text-indigo-600 dark:text-indigo-400">Pro</th>
                    <th className="p-4 font-bold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {featureComparison.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-medium text-slate-900 dark:text-white">{item.feature}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{item.dev}</td>
                      <td className="p-4 font-semibold text-indigo-600 dark:text-indigo-400">{item.pro}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{item.ent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}