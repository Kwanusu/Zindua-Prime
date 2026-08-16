import { useState } from "react";
import { Link } from "react-router-dom";
import AddAdminModal from "../components/AddAdminModal"
import { 
  Users, 
  Activity, 
  Server, 
  DollarSign, 
  TrendingUp, 
  LogOut, 
  Bell, 
  CheckCircle,
  AlertTriangle,
  Settings as SettingsIcon,
  Sliders,
  UserPlus
} from "lucide-react";
import { useAuth } from "../context/AuhContext";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);

  const stats = [
    { title: "Total Users", value: "24,512", change: "+12.5%", trend: "up", icon: Users },
    { title: "Active API Requests", value: "1.42M/s", change: "+8.2%", trend: "up", icon: Activity },
    { title: "Edge Node Status", value: "99.99%", change: "Healthy", trend: "neutral", icon: Server },
    { title: "Monthly Revenue", value: "$48,250", change: "+21.4%", trend: "up", icon: DollarSign }
  ];

  const recentUsers = [
    { id: 1, name: "David Kiprop", email: "david@payflow.io", plan: "Enterprise", status: "Active", date: "2 mins ago" },
    { id: 2, name: "Elena Rostova", email: "elena@devops.co", plan: "Pro", status: "Active", date: "15 mins ago" },
    { id: 3, name: "Marcus Vance", email: "marcus@cloud.net", plan: "Developer", status: "Pending", date: "1 hour ago" },
    { id: 4, name: "Sophia Martinez", email: "sophia@tech.com", plan: "Pro", status: "Active", date: "3 hours ago" }
  ];

  const systemAlerts = [
    { id: 1, type: "success", title: "US-East Edge Node Deployment", desc: "v2.0 runtime synced smoothly.", time: "10m ago" },
    { id: 2, type: "warning", title: "High Traffic Spike - EU Region", desc: "API requests reached 85% capacity threshold.", time: "45m ago" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Add Admin Modal Component */}
      <AddAdminModal 
        isOpen={isAddAdminOpen} 
        onClose={() => setIsAddAdminOpen(false)} 
      />

      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
              Z
            </span>
            <div>
              <h1 className="text-sm font-extrabold text-slate-900 dark:text-white">Admin Console</h1>
              <p className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                System Operational
              </p>
            </div>
          </div>

          {/* Right Navigation & Action Bar */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Notifications Button */}
            <button className="relative rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-indigo-600" />
            </button>

            {/* Account Settings Link (All Users) */}
            <Link
              to="/settings"
              title="Account Settings"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 p-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <SettingsIcon className="h-4 w-4" />
              <span className="hidden md:inline">Account</span>
            </Link>

            {/* System Settings Link (Super Admin Only) */}
            {user?.role === "Super Admin" && (
              <Link
                to="/admin/settings"
                title="System Settings (Super Admin)"
                className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 p-2 text-xs font-bold text-indigo-600 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-400 dark:hover:bg-indigo-900/60"
              >
                <Sliders className="h-4 w-4" />
                <span className="hidden md:inline">System Settings</span>
              </Link>
            )}

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

            {/* Profile Info */}
            <div className="flex items-center gap-3">
              <img src={user?.avatar} alt={user?.name} className="h-8 w-8 rounded-full border border-indigo-500 object-cover" />
              <div className="hidden text-left sm:block">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{user?.name}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{user?.role}</p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={logout}
              title="Sign Out"
              className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-600 transition hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/50 dark:text-rose-400 dark:hover:bg-rose-900/50"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Body Layout */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Welcome back, {user?.name ? user.name.split(" ")[0] : "Admin"} 👋
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Here is what is happening across your infrastructure today.</p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                activeTab === "overview" 
                  ? "bg-indigo-600 text-white dark:bg-indigo-500" 
                  : "border border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab("users")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                activeTab === "users" 
                  ? "bg-indigo-600 text-white dark:bg-indigo-500" 
                  : "border border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
              }`}
            >
              User Directory
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{item.title}</span>
                  <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{item.value}</span>
                  <span className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {item.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dashboard Grid: Activity & Table */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Recent Accounts Table */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Registrations</h3>
              <span className="cursor-pointer text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400">View All</span>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 font-semibold text-slate-400 dark:border-slate-800/60 dark:text-slate-500">
                    <th className="pb-3">User</th>
                    <th className="pb-3">Plan Tier</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {recentUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3.5">
                        <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                        <p className="text-[11px] text-slate-500">{u.email}</p>
                      </td>
                      <td className="py-3.5 font-medium text-slate-700 dark:text-slate-300">{u.plan}</td>
                      <td className="py-3.5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          u.status === "Active" 
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-400"
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-slate-500">{u.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Telemetry & Logs */}
          <div className="space-y-6 lg:col-span-4">
            
            {/* Realtime Alerts */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-4 text-base font-bold text-slate-900 dark:text-white">System Alerts</h3>
              <div className="space-y-3">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                    {alert.type === "success" ? (
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{alert.title}</p>
                      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{alert.desc}</p>
                      <span className="mt-1 block text-[10px] text-slate-400">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-3 text-base font-bold text-slate-900 dark:text-white">Admin Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                
                {/* Trigger Add Admin Modal Button */}
                <button
                  onClick={() => setIsAddAdminOpen(true)}
                  className="col-span-2 flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-2.5 px-3 text-center text-xs font-bold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  <UserPlus className="h-4 w-4" />
                  Add New User
                </button>

                <Link
                  to="/admin/settings"
                  className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <Sliders className="h-3.5 w-3.5 text-indigo-500" />
                  System Config
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <SettingsIcon className="h-3.5 w-3.5 text-indigo-500" />
                  My Account
                </Link>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}