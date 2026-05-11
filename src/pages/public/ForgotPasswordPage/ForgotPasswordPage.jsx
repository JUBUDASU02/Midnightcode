// pages/ForgotPasswordPage.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthLayout from "../components/auth/AuthLayout";
import LeftPanel from "../components/auth/LeftPanel";
import RightPanel from "../components/auth/RightPanel";
import AuthHeader from "../components/auth/AuthHeader";
import AuthFooter from "../components/auth/AuthFooter";
import FormInput from "../components/auth/FormInput";
import SubmitButton from "../components/auth/SubmitButton";

// ✅ Esquema con Zod
const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format")
});

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = (data) => {
    console.log("Email:", data.email);
    // Aquí va tu lógica de API
  };

  return (
    <AuthLayout>
      <LeftPanel
        title="Eclipse"
        subtitle="Reconnect with the rhythm. Reset your access to the city's most exclusive beats."
        backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDbCWdIi07fC21qGp_MK1QdyOPX7qp3IFpLmjCvebBWP1Vv0hPDSuN-3hJWnV_KXqnE9ouzdC08xR8ZRau4vObp3TViedAgNuVbv2K4h1-fWFj5LIlyhmZCH3lHkAEJt9HOCPHDexasDVAPoYDjqqDOWPGomV09J148xNvOk-6Xfju4lcrVHYJ9g2i90B0dvCX9mDMbjRPtgu6vbTT7RdvJLEnaf-RVh-9k1Zwab5293K9zEDqq6-BHtEOMS3ZQA39sWC2eDcXX-rI"
      />

      <RightPanel>
        <AuthHeader backUrl="/login" backText="Back to Login" />

        <main className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="mb-10">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
              <span className="material-symbols-outlined text-3xl text-primary">lock_reset</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-100 mb-4 tracking-tight">Forgot password?</h2>
            <p className="text-slate-400 text-lg">Enter your email and we'll send you a recovery link.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="dj@eclipse-club.com"
              register={register}
              error={errors.email?.message}
              icon="mail"
            />

            <SubmitButton icon="send">Send Reset Link</SubmitButton>
          </form>

          <div className="mt-12 p-6 rounded-xl glass-panel">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary">info</span>
              <p className="text-sm text-slate-400 leading-relaxed">
                If you don't see the email within 5 minutes, check your spam folder.
              </p>
            </div>
          </div>
        </main>

        <AuthFooter />
      </RightPanel>
    </AuthLayout>
  );
}