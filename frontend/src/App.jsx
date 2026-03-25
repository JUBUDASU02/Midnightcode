import { Routes, Route } from "react-router-dom"
import "./assets/css/style.css"

// Auth guards
import PrivateRoute  from "./components/Auth/PrivateRoute"
import PublicRoute   from "./components/Auth/PublicRoute"

//Hola el profe si se baño :D
// Public pages
import HomePage      from "./pages/public/Home/Home"
import LoginPage     from "./pages/public/Login/LoginPage"
import RegisterPage  from "./pages/public/Signup/SignupPage"
import ForgotPassword from "./pages/public/ForgotPasswordPage/ForgotPasswordPage"
import ResetPassword  from "./pages/public/ResetPasswordPage/ResetPasswordPage"

// Private — Admin
import AdminDashboard from "./pages/Private/Admin/Dashboard"

// Private — User
import UserDashboard from "./pages/Private/User/Dashboard"

//Private-DJ
import DJPanel from "./pages/Private/DJ/DJPanel"

// Private — Employee
import EmployeeDashboard from "./pages/Private/Employee/EmployeeDashboard"

function App() {
  return (
    <Routes>

      {/* ── Public ── */}
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={
        <PublicRoute><LoginPage /></PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute><RegisterPage /></PublicRoute>
      } />
      <Route path="/forgot-password" element={
        <PublicRoute><ForgotPassword /></PublicRoute>
      } />
      <Route path="/reset-password" element={
        <PublicRoute><ResetPassword /></PublicRoute>
      } />

      {/* ── Private — Admin ── */}
      <Route path="/admin" element={
        <PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>
      } />

      {/* ── Private — User (Profile is managed inside Dashboard) ── */}
      <Route path="/dashboard" element={
        <PrivateRoute><UserDashboard /></PrivateRoute>
      } />
      <Route path="/profile" element={
        <PrivateRoute><UserDashboard initialPage="profile" /></PrivateRoute>
      } />

      {/* ── Private — DJ Panel ── */}
      <Route path="/dj" element={
        <PrivateRoute role="dj"><DJPanel /></PrivateRoute>
      } />

      {/* ── Private — Employee Portal ── */}
      <Route path="/empleado" element={
        <PrivateRoute role="empleado"><EmployeeDashboard /></PrivateRoute>
      } />

      {/* 404 */}
      <Route path="*" element={
        <div style={{ minHeight:"100vh", background:"#080810", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"16px", fontFamily:"'Syne',sans-serif", color:"#fff" }}>
          <p style={{ fontSize:"80px", margin:0, color:"#c084fc" }}>404</p>
          <p style={{ color:"#6b6b8a", fontSize:"18px" }}>Página no encontrada</p>
          <a href="/" style={{ color:"#c084fc", fontSize:"14px" }}>← Volver al inicio</a>
        </div>
      } />

    </Routes>
  )
}

export default App