import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required")
});

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const { login, authError, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    clearError();
    const result = login({ email: data.email, password: data.password });
    if (result.success) {
      const from = location.state?.from?.pathname;
      const dest =
        result.role === "admin"
          ? "/admin"
          : result.role === "dj"
          ? "/dj"
          : "/dashboard";
      navigate(from || dest, { replace: true });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-hidden">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-background-dark items-center justify-center overflow-hidden">

        <div className="absolute inset-0 z-0">

          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>

          <div className="laser-line top-1/4 rotate-12"></div>
          <div className="laser-line top-1/2 -rotate-6"></div>
          <div className="laser-line top-3/4 rotate-45"></div>
          <div className="laser-line top-1/3 -rotate-12"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>

        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-12">

          <div className="mb-8 flex items-center gap-4 text-white">

            <div className="size-12 text-primary">
              <svg viewBox="0 0 48 48">
                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"/>
              </svg>
            </div>

            <h1 className="text-white text-6xl font-bold tracking-[-0.05em]">
              NOCTURNA
            </h1>

          </div>

          <p className="text-slate-400 text-xl max-w-md leading-relaxed">
            Step into a world where the music never stops and the night is always young.
          </p>

        </div>

        <div className="absolute bottom-10 left-10 flex gap-4">
          <div className="w-12 h-1 bg-primary rounded-full"></div>
          <div className="w-12 h-1 bg-white/10 rounded-full"></div>
          <div className="w-12 h-1 bg-white/10 rounded-full"></div>
        </div>

      </div>


      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 relative bg-background-light dark:bg-background-dark">

        {/* MOBILE LOGO */}
        <div className="lg:hidden absolute top-10 left-10 flex items-center gap-3">

          <div className="size-8 text-primary">
            <svg viewBox="0 0 48 48">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"/>
            </svg>
          </div>

          <h2 className="text-2xl font-bold">NOCTURNA</h2>

        </div>


        {/* LOGIN CARD */}
        <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-xl shadow-2xl">

          <div className="mb-10">

            <h3 className="text-3xl text-white font-bold mb-2">
              Welcome Back
            </h3>

            <p className="text-slate-400">
              Enter your credentials to access the club portal.
            </p>

          </div>


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* EMAIL */}
            <div>

              <label className="text-sm text-white mb-2 block">
                Email Address
              </label>

              <div className="relative">

                <span className=" material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  mail
                </span>

                <input
                  type="email"
                  placeholder="name@luxury.com"
                  {...register("email")}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/5 border border-primary/30 text-white focus:ring-primary outline-none"
                />

              </div>

              <p className="text-red-400 text-sm">
                {errors.email?.message}
              </p>

            </div>


            {/* PASSWORD */}
            <div>

              <div className="flex justify-between mb-2">

                <label className=" text-white text-sm">
                  Password
                </label>

                <a className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>

              </div>

              <div className="relative">

                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  lock
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full pl-12 pr-12 py-4 rounded-lg bg-white/5 border border-primary/30 text-white outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary"
                >
                  <span className="material-symbols-outlined">
                    visibility
                  </span>
                </button>

              </div>

              <p className="text-red-400 text-sm">
                {errors.password?.message}
              </p>

            </div>


            {/* REMEMBER */}
            <div className="flex items-center">

              <input
                type="checkbox"
                {...register("remember")}
                className="h-4 w-4 text-primary"
              />

              <label className="ml-2 text-sm text-slate-400">
                Remember my access
              </label>

            </div>


            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-lg shadow-lg neon-pulse flex items-center justify-center gap-2"
            >
              Enter the Night

              <span className="material-symbols-outlined">
                arrow_forward
              </span>

            </button>

            {authError ? (
              <p className="mt-4 text-center text-red-400 text-sm">
                {authError}
              </p>
            ) : null}

          </form>


          {/* SOCIAL LOGIN */}
          <div className="mt-10">

            <div className="relative flex items-center justify-center mb-8">

              <div className="flex-grow border-t border-primary/20"></div>

              <span className="mx-4 text-xs text-slate-400 uppercase tracking-widest">
                Membership Login
              </span>

              <div className="flex-grow border-t border-primary/20"></div>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <button className="flex items-center justify-center gap-2 py-3 rounded-lg border border-primary/20 bg-white text-slate-800 hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined">stars</span>
                Apple ID
              </button>

              <button className="flex items-center justify-center gap-2 py-3 rounded-lg border border-primary/20 bg-white text-slate-800 hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined">diamond</span>
                Google
              </button>

            </div>

          </div>


          <p className="mt-10 text-center text-sm text-slate-500">
            Not a member yet?{" "}
            <a className="text-primary font-bold hover:underline">
              Apply for entry
            </a>
          </p>

        </div>


        {/* FOOTER */}
        <footer className="absolute bottom-8 text-xs text-slate-500 flex gap-6">

          <a className="hover:text-primary">
            Privacy Policy
          </a>

          <a className="hover:text-primary">
            Terms of Service
          </a>

          <a className="hover:text-primary">
            Guest List
          </a>

        </footer>

      </div>

    </div>
  );
}
