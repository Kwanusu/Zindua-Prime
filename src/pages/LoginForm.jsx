import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Lock, Mail } from "lucide-react";
import InputField from "../InputField";
import { useAuth } from "../context/AuhContext";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState({});

  // Get path user was trying to access before being sent to login
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
      // Execute authentication
      const result = await login(formData.email, formData.password);

      if (result.success) {
        setIsSuccess(true);
        // Redirect after a brief delay so the user sees the success state
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 transition-colors duration-200 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Global Form Error Alert */}
        {error.form && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error.form}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="py-8 text-center">
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
                disabled={isLoading}
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
  );
}

export default LoginForm;