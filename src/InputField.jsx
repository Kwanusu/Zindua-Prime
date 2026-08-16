import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function InputField({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  actionLink,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const actualType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
        {actionLink}
      </div>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        )}

        <input
          id={id}
          name={name}
          type={actualType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-xl border bg-slate-50 py-2.5 text-sm text-slate-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800 ${
            Icon ? "pl-10" : "pl-4"
          } ${isPassword ? "pr-10" : "pr-4"} ${
            error
              ? "border-red-500 focus:ring-red-500/20"
              : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700"
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}