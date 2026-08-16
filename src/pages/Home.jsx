import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Star,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Layers,
  Sparkles
} from "lucide-react";
import { Footer } from "./Footer";

const carouselSlides = [
  {
    id: 1,
    badge: "Introducing ZinduaPrime v2.0",
    badgeIcon: Star,
    title: "Accelerate Your Business Growth with Next-Gen AI",
    description: "Streamline workflows, gain deep analytics insights, and automate repetitive tasks with our unified enterprise platform.",
    ctaPrimary: "Start Free Trial",
    ctaSecondary: "Schedule Demo",
    linkPrimary: "/signup",
    linkSecondary: "/demo",
    highlightText: "30-day free trial. No credit card required.",
    visualType: "metrics",
    metrics: [
      { label: "Active Users", value: "120K+" },
      { label: "Automation Rate", value: "99.4%" },
      { label: "Time Saved/wk", value: "18 hrs" }
    ]
  },
  {
    id: 2,
    badge: "Real-Time Intelligence",
    badgeIcon: BarChart3,
    title: "Actionable Insights & Predictive Analytics",
    description: "Turn raw operational data into powerful revenue forecasting with automated reporting dashboards and anomaly detection.",
    ctaPrimary: "Explore Analytics",
    ctaSecondary: "View Sample Reports",
    linkPrimary: "/analytics",
    linkSecondary: "/reports",
    highlightText: "Instant integration with AWS, Snowflake & Postgres.",
    visualType: "feature-list",
    features: [
      "Custom KPI Dashboards",
      "Automated PDF Exports",
      "Predictive Churn Risk Indicators"
    ]
  },
  {
    id: 3,
    badge: "Bank-Grade Security",
    badgeIcon: ShieldCheck,
    title: "Enterprise Protection & Compliance Built-In",
    description: "Protect sensitive data with end-to-end encryption, automated audit logs, SOC-2 Type II compliance, and granular role permissions.",
    ctaPrimary: "Security Overview",
    ctaSecondary: "Read Whitepaper",
    linkPrimary: "/security",
    linkSecondary: "/whitepaper",
    highlightText: "Zero-Trust Architecture out of the box.",
    visualType: "security-badges",
    badges: ["SOC2 Type II Certified", "GDPR & HIPAA Compliant", "256-bit AES Encryption"]
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const slide = carouselSlides[currentSlide];
  const BadgeIcon = slide.badgeIcon;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      
      {/* 1. Hero Section with Carousel */}
      <section 
        className="relative overflow-hidden py-16 lg:py-24"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Background gradient glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-600/15" />
        <div className="pointer-events-none absolute right-10 top-1/3 -z-10 h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-600/10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Main Carousel Frame */}
          <div className="relative rounded-3xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-md shadow-xl dark:border-slate-800/80 dark:bg-slate-900/60 sm:p-10 lg:p-12">
            
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              
              {/* Slide Content Column */}
              <div className="flex flex-col items-start lg:col-span-7">
                
                {/* Announcement Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 transition-all dark:border-indigo-900/50 dark:bg-indigo-950/60 dark:text-indigo-300">
                  <BadgeIcon className="h-4 w-4 fill-indigo-500 text-indigo-500" />
                  <span>{slide.badge}</span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>

                {/* Subtitle / Description */}
                <p className="mt-4 text-base text-slate-600 dark:text-slate-300 sm:text-lg">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to={slide.linkPrimary}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/35 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                  >
                    <span>{slide.ctaPrimary}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to={slide.linkSecondary}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/80 dark:hover:text-white"
                  >
                    {slide.ctaSecondary}
                  </Link>
                </div>

                {/* Sub-text highlight */}
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>{slide.highlightText}</span>
                </div>

              </div>

              {/* Slide Interactive Visual Column */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-indigo-50/50 p-6 shadow-inner dark:border-slate-800 dark:from-slate-900/80 dark:to-indigo-950/30">
                  
                  {slide.visualType === "metrics" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 dark:border-slate-800">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Platform Performance</span>
                        <Zap className="h-4 w-4 text-amber-500" />
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {slide.metrics.map((m, idx) => (
                          <div key={idx} className="flex items-center justify-between rounded-xl bg-white p-3.5 shadow-sm dark:bg-slate-800">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{m.label}</span>
                            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {slide.visualType === "feature-list" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 dark:border-slate-800">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Core Analytics</span>
                        <BarChart3 className="h-4 w-4 text-indigo-500" />
                      </div>
                      <div className="space-y-3">
                        {slide.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-3 rounded-xl bg-white p-3.5 shadow-sm dark:bg-slate-800">
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {slide.visualType === "security-badges" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 dark:border-slate-800">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Security Architecture</span>
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div className="space-y-3">
                        {slide.badges.map((badge, idx) => (
                          <div key={idx} className="flex items-center gap-3 rounded-xl bg-white p-3.5 shadow-sm dark:bg-slate-800">
                            <ShieldCheck className="h-5 w-5 flex-shrink-0 text-indigo-500" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{badge}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>

            {/* Carousel Navigation Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 pt-6 dark:border-slate-800/80">
              
              {/* Slide Indicators / Dots */}
              <div className="flex items-center gap-2">
                {carouselSlides.map((s, index) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "w-8 bg-indigo-600 dark:bg-indigo-400"
                        : "w-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Prev/Next & Playback Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  title={isPlaying ? "Pause autoplay" : "Start autoplay"}
                  aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>

                <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />

                <button
                  onClick={prevSlide}
                  className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={nextSlide}
                  className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 2. Feature Grid Section */}
      <section className="py-16 bg-white dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why Teams Choose ZinduaPrime</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">Everything you need to build, scale, and secure your modern digital products.</p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800/40">
              <div className="inline-flex rounded-xl bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">Lightning Fast</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Sub-millisecond API response times powered by global edge servers.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800/40">
              <div className="inline-flex rounded-xl bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">Ironclad Security</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Built-in threat monitoring, rate limiting, and encrypted storage by default.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800/40 sm:col-span-2 lg:col-span-1">
              <div className="inline-flex rounded-xl bg-amber-100 p-3 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">Seamless Collaboration</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Multi-tenant user roles, shared workspaces, and real-time team commenting.</p>
            </div>
          </div>
        </div>
      </section>
    <Footer/>
    </div>
  );
}