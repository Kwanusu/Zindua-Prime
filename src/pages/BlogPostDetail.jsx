import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark, Check } from "lucide-react";
import { useState } from "react";

export default function BlogPostDetail() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  // Mock single post data
  const post = {
    id: id || "1",
    title: "Introducing ZinduaPrime v2.0: Next-Gen Global Edge Runtime",
    category: "Product Update",
    author: "Sarah Chen",
    role: "CEO & Co-Founder",
    authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    date: "Aug 10, 2026",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    content: `
      <p>Today, we are thrilled to announce the general availability of <strong>ZinduaPrime v2.0</strong>. Over the last 12 months, our core engineering team rebuilt our infrastructure layer from the ground up to address performance limits faced by ultra-low latency applications.</p>
      
      <h2>Why We Rebuilt the Core Engine</h2>
      <p>Modern applications require real-time execution closer to where end-users are physically located. Standard centralized cloud compute nodes introduce unnecessary round-trip latency. With v2.0, we shifted to a distributed WebAssembly execution model operating across 120+ global POPs.</p>

      <blockquote>
        "Our goal was simple: make global edge deployments as easy as git push, without compromising security or observability."
      </blockquote>

      <h2>Key Features in v2.0</h2>
      <ul>
        <li>Sub-10ms global cold starts using light isolate runtimes.</li>
        <li>Automatic edge-database connection pooling and streaming.</li>
        <li>Unified telemetry logs delivered straight to your dashboard in real-time.</li>
      </ul>
    `
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Top Navigation Back Button */}
      <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Link>
      </div>

      {/* Article Header */}
      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          <span>{post.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {/* Author & Share Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img src={post.authorImg} alt={post.author} className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{post.author}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{post.role} • {post.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
              {copied ? "Link Copied!" : "Share"}
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 shadow-sm dark:border-slate-800">
          <img src={post.coverImage} alt={post.title} className="max-h-[480px] w-full object-cover" />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-slate mt-10 max-w-none text-slate-700 leading-relaxed dark:prose-invert dark:text-slate-300 sm:text-lg">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Sample Code Block Box */}
          <div className="my-8 overflow-hidden rounded-2xl bg-slate-900 p-4 text-xs font-mono text-emerald-400 shadow-md">
            <div className="mb-2 text-slate-500">// Example: Deploying an isolate handler in v2.0</div>
            <code>
              {`import { createServer } from "@zindua/runtime";\n\nexport default createServer({\n  port: 8080,\n  fetch(req) {\n    return new Response("Hello Edge World!");\n  }\n});`}
            </code>
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <img src={post.authorImg} alt={post.author} className="h-14 w-14 rounded-full object-cover" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Written by {post.author}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Sarah is CEO and Co-Founder at ZinduaPrime. She leads product strategy and infrastructure engineering.
              </p>
            </div>
          </div>
        </div>
      </article>

    </div>
  );
}