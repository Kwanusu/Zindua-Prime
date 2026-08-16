import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import { Footer } from "../pages/Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">      
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Dynamic Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 3. Global Footer */}
      {/* <Footer /> */}
    </div>
  );
}