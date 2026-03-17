import { Routes, Route } from "react-router-dom"
import "../src/assets/css/style.css"
// Libres
import HomePage from "./pages/public/Home/Home"
import Register from "./pages/public/Signup/SignupPage"
import Login from "./pages/public/Login/LoginPage"
import ForgotPassword from "./pages/public/ForgotPasswordPage/ForgotPasswordPage"
import ResetPassword from "./pages/public/ResetPasswordPage/ResetPasswordPage"

// Privadas Admin
import NeonOverloadDashboard from "./pages/Private/Admin/Dashboard"

// Privadas User
import Dashboard from "./pages/Private/User/Dashboard"
import Profile from "./pages/Private/User/Profile"


function App() {

  return (
    <Routes>

      {/* libres */}
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register/>} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/reset-password" element={<ResetPassword />} />

      {/* privadas admin */}
      <Route path="/admin" element={<NeonOverloadDashboard/>} />

      {/* privadas user */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />

    </Routes>
  )

}

export default App
