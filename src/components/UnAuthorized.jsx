import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Unauthorized() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 text-center">
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 dark:bg-rose-500/20">
          <ShieldAlert className="h-8 w-8" />
        </div>
        
        <h1 className="mt-4 text-2xl font-black text-slate-900 dark:text-white">403 - Access Denied</h1>
        
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          Your current account role (<strong className="text-indigo-600 dark:text-indigo-400">{user?.role || "Guest"}</strong>) does not have permission to view this specific route.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            to="/admin"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}