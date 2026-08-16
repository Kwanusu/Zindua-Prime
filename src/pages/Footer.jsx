import { Send } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div>
        {/* 5. Industry Standard Multi-Column Footer */}
      <footer className="border-t border-slate-200 bg-white pt-16 pb-12 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Top Section: Brand + Newsletter + Navigation Columns */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            
            {/* Column 1: Brand Info & Newsletter (Spans 4 columns on large screens) */}
            <div className="lg:col-span-4">
              <Link to="/" className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Zindua<span className="text-indigo-600 dark:text-indigo-400">Prime</span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Empowering teams to build, scale, and deploy next-generation web applications with speed and security.
              </p>

              {/* Newsletter Subscription */}
              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Subscribe to our developer newsletter
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex max-w-md items-center gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-900"
                    required
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center rounded-xl bg-indigo-600 p-2.5 text-white transition-all hover:bg-indigo-700 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    aria-label="Subscribe"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* Column 2 to 5: Dynamic Navigation Grids (Spans 8 columns on large screens) */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
              
              {/* Product Links */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Product
                </h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li><Link to="/features" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Features</Link></li>
                  <li><Link to="/pricing" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Pricing</Link></li>
                  <li><Link to="/integrations" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Integrations</Link></li>
                  <li><Link to="/changelog" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Changelog</Link></li>
                  <li><Link to="/docs" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Documentation</Link></li>
                </ul>
              </div>

              {/* Solutions Links */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Solutions
                </h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li><Link to="/enterprise" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Enterprise</Link></li>
                  <li><Link to="/startups" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Startups</Link></li>
                  <li><Link to="/saas" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">SaaS Platforms</Link></li>
                  <li><Link to="/security" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Security</Link></li>
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Resources
                </h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li><Link to="/blog" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Blog</Link></li>
                  <li><Link to="/community" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Community</Link></li>
                  <li><Link to="/guides" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Guides & Tutorials</Link></li>
                  <li><Link to="/help" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Help Center</Link></li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Company
                </h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li><Link to="/about" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">About Us</Link></li>
                  <li><Link to="/careers" className="inline-flex items-center gap-1.5 text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Careers <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">Hiring</span></Link></li>
                  <li><Link to="/contact" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Contact</Link></li>
                  <li><Link to="/partners" className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Partners</Link></li>
                </ul>
              </div>

            </div>
          </div>

          {/* Divider */}
          <div className="my-12 border-t border-slate-200 dark:border-slate-800" />

          {/* Bottom Section: Copyright, Status, Legal & Socials */}
          <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row">
            
            {/* Left side: Copyright & Status */}
            <div className="flex flex-col items-center gap-3 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:gap-6">
              <p>© {new Date().getFullYear()} ZinduaPrime, Inc. All rights reserved.</p>
              
              {/* System Status Indicator */}
              <a href="https://status.example.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-300">All Systems Operational</span>
              </a>
            </div>

            {/* Right side: Legal Links & Social SVGs */}
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              
              {/* Legal navigation */}
              <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
                <Link to="/privacy" className="hover:text-slate-900 dark:hover:text-white">Privacy Policy</Link>
                <span>•</span>
                <Link to="/terms" className="hover:text-slate-900 dark:hover:text-white">Terms of Service</Link>
                <span>•</span>
                <Link to="/cookies" className="hover:text-slate-900 dark:hover:text-white">Cookie Settings</Link>
              </div>

              {/* Native Brand Social SVGs */}
              <div className="flex gap-4 text-slate-400 dark:text-slate-500">
                {/* GitHub */}
                <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-slate-700 dark:hover:text-slate-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="transition hover:text-slate-700 dark:hover:text-slate-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-slate-700 dark:hover:text-slate-200">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>

            </div>

          </div>

        </div>
      </footer>
    </div>
  )
}
