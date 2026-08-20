import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/ThemeContext";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import BlogPostDetail from "./pages/BlogPostDetail";
import Layout from "./components/Layout";
import AdminDashboard from "./pages/AdminDshboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/Settings";
import SystemSettings from "./pages/SystemSettings"
import { AuthProvider } from "./context/AuthContext";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookieSettings from "./pages/CookieSettings";
import ProductManager from "./pages/ProductManager";
import CharacterList from "./components/Characters";
import Products from "./pages/Products";
import { Cart } from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";

function App() {

  return (
    <>
    <ThemeProvider>
        <AuthProvider>
          <Routes>  
            
            <Route element={<Layout />}>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<LoginForm /> }/>
              <Route path="/register" element={<RegisterForm /> }/>
              <Route path="/about" element={<About /> }/>
              <Route path="/contact" element={<Contact /> }/>
              <Route path="/blog" element={<Blogs /> }/>
              <Route path="/cart" element={<Cart /> }/>
              <Route path="/products" element={<Products /> }/>
              <Route path="/character" element={<CharacterList /> }/>
              <Route path="/checkout" element={<CheckoutPage /> }/>
              <Route path="/blog/:id" element={<BlogPostDetail /> }/>
              <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookieSettings />} />
            </Route> 
            {/* 1. General Admin Route (Super Admin, Editor, Viewer) */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={["Super Admin", "Editor", "Viewer"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* 1. Account Settings (Allowed for Super Admin, Editor, Viewer) */}
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute allowedRoles={["Super Admin", "Admin", "Editor", "Viewer"]}>
                      <Settings />
                    </ProtectedRoute>
                  }
                />

                {/* 2. System Settings (Restricted to Super Admin ONLY) */}
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedRoute allowedRoles={["Super Admin"]}>
                      <SystemSettings />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
         </AuthProvider>
    </ThemeProvider>
    </>
  );
}

export default App;
