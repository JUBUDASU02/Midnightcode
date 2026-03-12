import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MissionVision from "./components/MissionVision";
import Features from "./components/Features";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage/ResetPasswordPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="bg-black min-h-screen">
            <Navbar />
            <Hero />
            <MissionVision />
            <Features />
            <Footer />
          </div>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      {/* add more routes as needed */}
    </Routes>
  );
}

export default App;