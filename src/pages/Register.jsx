import { useState } from "react";
import { Mail, Lock, User, ShieldCheck, Loader2, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import InputField from "../InputField";

export default function RegisterForm() {
  const { login } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and privacy policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      login({
        name: formData.name,
        email: formData.email,
        role: "user",
        unreadNotifications: 1,
      });

      setIsSuccess(true);
    } catch (err) {
      setErrors({ form: "Could not create account. Please try again." }, err);
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
            Create an account
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Fill in your details below to get started with Zindua
          </p>
        </div>

        {/* Form Error */}
        {errors.form && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errors.form}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
            <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
              Account created!
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Redirecting to your dashboard...
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <InputField
                id="register-name"
                name="name"
                label="Full Name"
                placeholder="Anthony Kibet"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                icon={User}
              />

              <InputField
                id="register-email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="anthony@zindua.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={Mail}
              />

              <InputField
                id="register-password"
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={Lock}
              />

              <InputField
                id="register-confirm-password"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                icon={ShieldCheck}
              />

              <div className="pt-1">
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    I agree to the{" "}
                    <Link to="/terms" className="text-indigo-600 hover:underline dark:text-indigo-400">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-indigo-600 hover:underline dark:text-indigo-400">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="mt-1 text-xs text-red-500">{errors.agreeTerms}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-slate-900"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Link to Login */}
            <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Sign in instead
              </Link>
            </p>
          </>
        )}

      </div>
    </div>
  );
}