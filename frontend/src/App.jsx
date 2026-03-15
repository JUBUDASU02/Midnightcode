import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/public/Home/Home"
import LoginPage from "./pages/public/Login/LoginPage"
import SignupPage from "./components/SignupPage/SignupPage"
import ForgotPasswordPage from "./pages/public/ForgotPasswordPage/ForgotPasswordPage"
import ResetPasswordPage from "./pages/public/ResetPasswordPage/ResetPasswordPage"
import "../src/assets/css/style.css"

function App() {

  return (
    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignupPage />} />

      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route path="/reset-password" element={<ResetPasswordPage />} />

    </Routes>
  )

}

export default App
