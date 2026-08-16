import { Link } from "react-router-dom";
import { 
  Target, 
  Users, 
  Lightbulb, 
  Award, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Customer First",
      description: "Every feature we build starts with solving real problems for our community of developers and creators."
    },
    {
      icon: Lightbulb,
      title: "Continuous Innovation",
      description: "We constantly push boundaries to stay ahead of modern web standards and performance demands."
    },
    {
      icon: Users,
      title: "Radical Collaboration",
      description: "We believe the best products are forged through open communication, diversity, and teamwork."
    },
    {
      icon: Award,
      title: "Uncompromising Quality",
      description: "From code execution to UI polish, we never settle for anything less than exceptional."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "David Kiprop",
      role: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Elena Rostova",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
    },
    {
      name: "Marcus Vance",
      role: "Lead Systems Architect",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-600/15" />

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            About ZinduaPrime
          </span>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Empowering developers to build the future of the web
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
            We are on a mission to simplify application deployment and management so teams can focus on what matters most: delivering value to their users.
          </p>
        </div>
      </section>

      {/* Story / Mission Section */}
      <section className="border-y border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Our Story
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                Founded in 2024, ZinduaPrime started with a simple frustration: building enterprise-ready infrastructure was far too complex and time-consuming.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                What began as an internal developer tool quickly evolved into a comprehensive platform used by startups and global enterprises alike. Today, we process millions of requests daily across a global network.
              </p>
              
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>Global infrastructure with 99.9% uptime SLA</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>Security-first architecture and compliance</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>24/7 dedicated support from real engineers</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl border border-slate-200 bg-slate-100 p-8 dark:border-slate-800 dark:bg-slate-900 lg:p-12">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-950">
                  <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">10k+</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Active Users</p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-950">
                  <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">50M+</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Daily Requests</p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-950">
                  <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">120+</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Edge Regions</p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-950">
                  <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">99.9%</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Uptime Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Guiding Principles
            </h2>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Our Core Values
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="border-t border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Leadership
            </h2>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Meet the Team Behind ZinduaPrime
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, idx) => (
              <div key={idx} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="mx-auto h-32 w-32 rounded-full object-cover shadow-md"
                />
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-indigo-600 px-6 py-12 text-center text-white shadow-xl dark:bg-indigo-900/80 sm:px-12 lg:py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">Want to join our journey?</h2>
          <p className="mt-2 text-indigo-100">Explore our open roles or reach out directly to team up with us.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-600 transition hover:bg-slate-100">
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}