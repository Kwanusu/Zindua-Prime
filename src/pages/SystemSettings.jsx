import { useState } from "react";
import { 
  User, 
  Lock, 
  Bell, 
  ShieldCheck, 
  Key, 
  Save, 
  Check, 
  Upload, 
  Trash2, 
  Smartphone, 
  Plus, 
  Copy, 
 
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  // Profile Form State
  const [profile, setProfile] = useState({
    name: user?.name || "Sarah Chen",
    email: user?.email || "sarah@zindua.com",
    role: user?.role || "Super Admin",
    bio: "Lead Infrastructure & Frontend Architect at ZinduaPrime.",
    avatar: user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  });

  // Password State
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState({
    emailDigests: true,
    securityAlerts: true,
    deployNotifications: false,
    marketingEmails: false,
  });

  // 2FA State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // API Keys
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production Gateway", key: "zk_live_994827...a810", created: "Aug 10, 2026" },
    { id: 2, name: "Staging Pipeline", key: "zk_test_104928...f229", created: "Jul 18, 2026" }
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate async API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 3000);
    }, 800);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security & 2FA", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "team", label: "Team & Roles", icon: ShieldCheck },
    { id: "apikeys", label: "API Keys", icon: Key },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Toast Notification */}
      {showSaveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-xl animate-fade-in">
          <Check className="h-4 w-4" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Account Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your personal profile, security credentials, preferences, and organization settings.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Sub-Navigation Tabs (Sidebar) */}
          <aside className="lg:col-span-3">
            <nav className="flex space-x-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex-col lg:space-x-0 lg:space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 dark:bg-indigo-500"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              
              {/* TAB 1: PROFILE */}
              {activeTab === "profile" && (
                <form onSubmit={handleSave} className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Profile Information</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Update your account details and public avatar.</p>
                  </div>

                  <hr className="border-slate-100 dark:border-slate-800" />

                  {/* Avatar Upload */}
                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="h-20 w-20 rounded-2xl object-cover border-2 border-indigo-500/30"
                    />
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                          <Upload className="h-3.5 w-3.5" />
                          Change Picture
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Bio</label>
                    <textarea
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                      <Save className="h-4 w-4" />
                      <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: SECURITY */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Security & Password</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Manage your passwords and two-factor authentication.</p>
                  </div>

                  <hr className="border-slate-100 dark:border-slate-800" />

                  {/* Change Password Form */}
                  <form onSubmit={handleSave} className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Change Password</h3>
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Current Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3.5 text-xs text-slate-900 outline-none focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3.5 text-xs text-slate-900 outline-none focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Confirm New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3.5 text-xs text-slate-900 outline-none focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 dark:bg-indigo-500"
                    >
                      Update Password
                    </button>
                  </form>

                  <hr className="border-slate-100 dark:border-slate-800" />

                  {/* 2FA Toggle */}
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Add an extra layer of security using an authenticator app.</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        twoFactorEnabled ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          twoFactorEnabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Notification Preferences</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Choose how and when you receive alerts from our platform.</p>
                  </div>

                  <hr className="border-slate-100 dark:border-slate-800" />

                  <div className="space-y-4">
                    {[
                      { id: "securityAlerts", title: "Security & Login Alerts", desc: "Get notified immediately about new sign-ins or suspicious activity." },
                      { id: "emailDigests", title: "Weekly Performance Digest", desc: "A weekly summary of your edge runtime traffic and errors." },
                      { id: "deployNotifications", title: "Deployment Statuses", desc: "Receive email notifications when builds complete or fail." },
                      { id: "marketingEmails", title: "Product Updates & Announcements", desc: "Be the first to hear about new features and major releases." }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications({ ...notifications, [item.id]: !notifications[item.id] })}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            notifications[item.id] ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              notifications[item.id] ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSave}
                      className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 dark:bg-indigo-500"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: TEAM & ROLES */}
              {activeTab === "team" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Organization Members</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Manage team access and permissions.</p>
                    </div>
                    <button className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-700 dark:bg-indigo-500">
                      <Plus className="h-4 w-4" />
                      Invite Member
                    </button>
                  </div>

                  <hr className="border-slate-100 dark:border-slate-800" />

                  <div className="space-y-3">
                    {[
                      { name: "Sarah Chen", email: "sarah@zindua.com", role: "Super Admin" },
                      { name: "David Kiprop", email: "david@zindua.com", role: "Editor" },
                      { name: "Elena Rostova", email: "elena@zindua.com", role: "Viewer" }
                    ].map((member, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl border border-slate-100 p-3.5 dark:border-slate-800">
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{member.name}</p>
                          <p className="text-[11px] text-slate-500">{member.email}</p>
                        </div>
                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                          {member.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: API KEYS */}
              {activeTab === "apikeys" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">API Keys</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Secret tokens for authenticating programmatic API requests.</p>
                    </div>
                    <button className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-700 dark:bg-indigo-500">
                      <Plus className="h-4 w-4" />
                      Generate New Key
                    </button>
                  </div>

                  <hr className="border-slate-100 dark:border-slate-800" />

                  <div className="space-y-3">
                    {apiKeys.map((k) => (
                      <div key={k.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{k.name}</p>
                          <p className="mt-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">{k.key}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button title="Copy Key" className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                          <button title="Revoke Key" className="rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50 dark:border-rose-900/50 dark:text-rose-400">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </main>

        </div>

      </div>
    </div>
  );
}