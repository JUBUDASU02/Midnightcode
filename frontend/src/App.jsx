import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/public/Home/Home"
import Register from "./pages/public/Signup/SignupPage"
import Login from "./pages/public/Login/LoginPage"
import ForgotPassword from "./pages/public/ForgotPasswordPage/ForgotPasswordPage"
import ResetPassword from "./pages/public/ResetPasswordPage/ResetPasswordPage"
import "../src/assets/css/style.css"

function App() {

  return (
    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register/>} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/reset-password" element={<ResetPassword />} />

    </Routes>
  )

}

export default App
