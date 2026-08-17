import React from "react";

export default function ZinduaLogo({
  className = "h-10",
  variant = "full",
  inverted = false, // Set to true whenever placed on a permanently dark container
}) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Icon Mark */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto drop-shadow-md"
      >
        <defs>
          <linearGradient id="zinduaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="zinduaAccent" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>

        {/* Dynamic Shield Frame */}
        <path
          d="M50 5 L88 27 V73 L50 95 L12 73 V27 Z"
          className={
            inverted
              ? "fill-slate-900"
              : "fill-white dark:fill-slate-900 transition-colors duration-200"
          }
          stroke="url(#zinduaGradient)"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Dynamic 'Z' + 'Prime Arrow' Geometry */}
        <path
          d="M32 32 H68 L42 52 H68 L32 70"
          stroke="url(#zinduaGradient)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Spark / Prime Accent Diamond */}
        <polygon points="68,26 74,32 68,38 62,32" fill="url(#zinduaAccent)" />
      </svg>

      {/* Brand Wordmark */}
      {variant === "full" && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span
              className={`text-xl font-black tracking-tight sm:text-2xl ${
                inverted
                  ? "text-white"
                  : "text-slate-900 dark:text-white transition-colors duration-200"
              }`}
            >
              ZINDUA
            </span>
            <span
              className={`bg-gradient-to-r text-xl font-black tracking-tight text-transparent sm:text-2xl ${
                inverted
                  ? "from-indigo-400 to-cyan-400 bg-clip-text"
                  : "from-indigo-600 to-cyan-500 bg-clip-text dark:from-indigo-400 dark:to-cyan-400 transition-colors duration-200"
              }`}
            >
              PRIME
            </span>
          </div>
          <span
            className={`text-[9px] font-semibold tracking-widest uppercase ${
              inverted
                ? "text-slate-400"
                : "text-slate-500 dark:text-slate-400 transition-colors duration-200"
            }`}
          >
            Cloud Platform
          </span>
        </div>
      )}
    </div>
  );
}