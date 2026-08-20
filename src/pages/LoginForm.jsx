import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Lock, Mail, ShieldCheck, Zap } from "lucide-react";
import InputField from "../InputField";
import { useAuth } from "../context/AuthContext";
import ZinduaLogo from "../components/ZinduaLogo";

function LoginForm() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState({});

  const redirectPath = location.state?.from?.pathname || "/admin";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error[name] || error.form) {
      setError((prev) => ({ ...prev, [name]: null, form: null }));
    }
  };

  const validate = () => {
    const newError = {};

    if (!formData.email.trim()) {
      newError.email = "Email address required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newError.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newError.password = "Password required";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate(redirectPath, { replace: true });
        }, 1200);
      } else {
        setError({ form: result.message || "Invalid email or password" });
      }
    } catch (err) {
      setError({ form: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsSocialLoading(true);
    setError({});

    try {
      const result = await loginWithGoogle();

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate(redirectPath, { replace: true });
        }, 1200);
      } else {
        setError({ form: result.message || "Google Sign-In failed" });
      }
    } catch (err) {
      setError({ form: "An unexpected error occurred during Google Auth." });
    } finally {
      setIsSocialLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 transition-colors duration-200 dark:bg-slate-950 sm:p-6 lg:p-8">
      {/* Main Container */}
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-12">
        
        {/* Left Side: Gradient Hero & Brand Showcase */}
        <div className="relative flex flex-col justify-between overflow-hidden border-b border-slate-200 bg-slate-950 p-8 text-white dark:border-slate-800 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-10">
          
          {/* Enhanced Radial Glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl" />

          {/* Logo Container */}
          <div className="relative z-10">
            <ZinduaLogo className="h-12" variant="full" inverted={true} />          
          </div>

          {/* Core Brand Selling Points */}
          <div className="relative z-10 my-8 hidden space-y-6 sm:block lg:my-0">
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold tracking-tight text-white">
                Empowering Next-Gen Applications
              </h3>
              <p className="text-xs leading-relaxed text-slate-400">
                Deploy, monitor, and scale cloud workloads with precision tools and automated pipelines.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
                <ShieldCheck className="h-5 w-5 text-indigo-400" />
                <span className="text-xs font-medium text-slate-300">Enterprise Security Default</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
                <Zap className="h-5 w-5 text-cyan-400" />
                <span className="text-xs font-medium text-slate-300">99.9% Uptime Guarantee</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="relative z-10 text-[11px] text-slate-500">
            © {new Date().getFullYear()} ZinduaPrime Inc. All rights reserved.
          </div>
        </div>

        {/* Right Side: Interactive Login Form */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-7">
          
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Enter your credentials to access your account workspace
            </p>
          </div>

          {/* Global Form Error Alert */}
          {error.form && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3.5 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error.form}</span>
            </div>
          )}

          {isSuccess ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500 animate-bounce" />
              <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                Signed in successfully!
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Redirecting to your dashboard...
              </p>
            </div>
          ) : (
            <>
              {/* Social Login Options */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={isLoading || isSocialLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750"
                >
                  {isSocialLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  )}
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  disabled={isLoading || isSocialLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750"
                >
                  <svg className="h-4 w-4 fill-current text-slate-900 dark:text-white" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-5 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <span className="relative bg-white px-3 text-[11px] font-medium text-slate-400 uppercase dark:bg-slate-900">
                  Or continue with email
                </span>
              </div>

              {/* Form Controls */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <InputField
                  id="login-email"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="admin@zindua.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={error.email}
                  icon={Mail}
                />

                <InputField
                  id="login-password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  error={error.password}
                  icon={Lock}
                  actionLink={
                    <Link
                      to="/forgot-password"
                      className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Forgot?
                    </Link>
                  }
                />

                <div className="pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      Remember me on this device
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || isSocialLoading}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-slate-900"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Link to Register */}
              <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Create an account
                </Link>
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default LoginForm;