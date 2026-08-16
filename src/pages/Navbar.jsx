import { useState } from "react";
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Bell, 
  LogOut, 
  LogIn, 
  UserPlus,
  Shield, 
  User as UserIcon 
} from "lucide-react";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md transition-colors duration-200 dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand / Logo */}
        <Link 
          to="/" 
          className="text-xl font-bold tracking-tight text-gray-900 transition-colors dark:text-white"
        >
          Zindua<span className="text-indigo-600 dark:text-indigo-400">Prime</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle Navigation Menu"
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white md:hidden"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Links + Actions Container */}
        <div 
          className={`
            absolute inset-x-0 top-full border-b border-gray-200 bg-white p-4 transition-all duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-900 
            md:static md:flex md:w-auto md:items-center md:gap-8 md:border-none md:bg-transparent md:p-0 dark:md:bg-transparent
            ${isMobileOpen ? "block" : "hidden md:flex"}
          `}
        >
          {/* Nav Links */}
          <ul className="flex flex-col gap-2 font-medium text-gray-600 dark:text-gray-300 md:flex-row md:items-center md:gap-6">
            <li>
              <Link 
                to="/about" 
                className="block rounded-md px-3 py-2 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white md:p-0 md:hover:bg-transparent dark:md:hover:bg-transparent"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="block rounded-md px-3 py-2 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white md:p-0 md:hover:bg-transparent dark:md:hover:bg-transparent"
              >
                Contact
              </Link>
            </li>

            {/* Conditionally Render Profile Link in Nav */}
            {isAuthenticated && (
              <li>
                <Link 
                  to="/profile" 
                  className="block rounded-md px-3 py-2 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white md:p-0 md:hover:bg-transparent dark:md:hover:bg-transparent"
                >
                  Profile
                </Link>
              </li>
            )}

            {/* Conditionally Render Admin Panel Link */}
            {isAdmin && (
              <li>
                <Link 
                  to="/admin" 
                  className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/50 md:p-0 md:hover:bg-transparent dark:md:hover:bg-transparent"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin Panel</span>
                </Link>
              </li>
            )}
          </ul>

          <div className="my-3 border-t border-gray-200 dark:border-gray-800 md:hidden" />

          {/* Right Action Items */}
          <div className="flex items-center justify-between gap-4 md:justify-end">
            
            {/* Theme Toggle Button */}
            <button 
              type="button" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5 text-amber-400" />
              )}
            </button>

            {/* Auth Conditional Rendering */}
            {isAuthenticated ? (
              /* Authenticated User Actions */
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Profile Link with User Name */}
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
                >
                  <UserIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span>{user?.name}</span>
                </Link>

                {/* Notifications Icon with Badge */}
                {user?.unreadNotifications > 0 && (
                  <div className="relative inline-flex items-center">
                    <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {user.unreadNotifications}
                    </span>
                  </div>
                )}

                {/* Logout Button */}
                <button 
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              /* Unauthenticated Actions: Login & Register Links */
              <div className="flex items-center gap-2">
                <Link 
                  to="/login"
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>

                {/* <Link 
                  to="/register"
                  className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link> */}
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}