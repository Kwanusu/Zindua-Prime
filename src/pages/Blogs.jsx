import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Clock, 
  User, 
  ArrowRight, 
  Tag,
  ChevronRight,
  TrendingUp
} from "lucide-react";

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Engineering",
    "Product Update",
    "Tutorials",
    "DevOps",
    "Case Studies"
  ];

  const featuredPost = {
    id: 1,
    title: "Introducing ZinduaPrime v2.0: Next-Gen Global Edge Runtime",
    excerpt: "Discover how our completely re-architected edge deployment engine delivers sub-10ms response times globally while slashing infrastructure costs by 40%.",
    category: "Product Update",
    author: "Sarah Chen",
    role: "CEO & Co-Founder",
    date: "Aug 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: "Optimizing Web Vitals for High-Traffic React Applications",
      excerpt: "Practical steps and patterns to reduce your Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) in complex modern frontend apps.",
      category: "Engineering",
      author: "David Kiprop",
      date: "Aug 02, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      title: "Zero-Trust Security Models for Modern SaaS Pipelines",
      excerpt: "Learn how to implement end-to-end continuous authentication and role-based token validation without degrading user experience.",
      category: "DevOps",
      author: "Elena Rostova",
      date: "Jul 26, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 4,
      title: "Building Micro-Frontends with React Router and Module Federation",
      excerpt: "A comprehensive guide on splitting large codebase monoliths into independent, deployable feature modules.",
      category: "Tutorials",
      author: "Marcus Vance",
      date: "Jul 18, 2026",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 5,
      title: "How PayFlow Scaled to 10M Daily Transactions using ZinduaPrime",
      excerpt: "An inside look at how PayFlow migrated their entire API gateway to our platform, achieving 99.999% uptime during peak holiday traffic.",
      category: "Case Studies",
      author: "Sarah Chen",
      date: "Jul 12, 2026",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 6,
      title: "The Future of Serverless: WebAssembly on the Edge",
      excerpt: "Why WebAssembly (Wasm) is rapidly becoming the standard execution environment for ultra-low latency compute workloads.",
      category: "Engineering",
      author: "David Kiprop",
      date: "Jul 01, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600"
    }
  ];

  // Filter logic
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      
      {/* 1. Header & Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-600/15" />
        
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <TrendingUp className="h-4 w-4" />
            ZinduaPrime Blog & Insights
          </span>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Thought leadership, technical guides, and product news
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
            Stay ahead with the latest architectural patterns, engineering best practices, and release notes from our team.
          </p>

          {/* Search Box */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search articles by title, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:border-indigo-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Filter Pills */}
      <section className="border-y border-slate-200 bg-white py-4 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start gap-2 overflow-x-auto pb-2 sm:justify-center sm:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 dark:bg-indigo-500"
                    : "border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Article */}
      {!searchQuery && selectedCategory === "All" && (
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 lg:grid lg:grid-cols-12 lg:gap-8">
              
              {/* Linked Image Side */}
              <Link 
                to={`/blog/${featuredPost.id}`} 
                className="relative block h-64 overflow-hidden lg:col-span-7 lg:h-full"
              >
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white dark:bg-indigo-500">
                  Featured
                </div>
              </Link>

              {/* Text Side */}
              <div className="flex flex-col justify-between p-8 lg:col-span-5 lg:p-12">
                <div>
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400">
                      <Tag className="h-3.5 w-3.5" />
                      {featuredPost.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 sm:text-3xl">
                    <Link to={`/blog/${featuredPost.id}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <User className="h-4 w-4 text-indigo-500" />
                    <span className="font-semibold text-slate-900 dark:text-slate-200">{featuredPost.author}</span>
                    <span>({featuredPost.date})</span>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 4. Blog Posts Grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
            </h2>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Showing {filteredPosts.length} post{filteredPosts.length !== 1 && "s"}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="text-base font-semibold text-slate-700 dark:text-slate-300">No articles found matching your criteria.</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Try adjusting your search terms or filter selection.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    {/* Linked Thumbnail */}
                    <Link to={`/blog/${post.id}`} className="relative block h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                        {post.category}
                      </span>
                    </Link>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>

                      <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                        <Link to={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-400">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-slate-100 px-6 pb-6 pt-4 dark:border-slate-800/60">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      By {post.author}
                    </span>
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 transition group-hover:translate-x-0.5 dark:text-indigo-400"
                    >
                      <span>Read</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}