import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

/* ---------------- VALIDATION ---------------- */

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password required")
    .min(6, "Minimum 6 characters"),
})

/* ---------------- PAGE ---------------- */

export default function LoginPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-background-light dark:bg-background-dark font-display">

      <LeftVisual />

      <RightLogin />

    </div>
  )
}

/* ---------------- LEFT VISUAL ---------------- */

function LeftVisual() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-background-dark items-center justify-center overflow-hidden">

      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />

        <div className="absolute top-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 rotate-12" />
        <div className="absolute top-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 -rotate-6" />
        <div className="absolute top-3/4 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 rotate-45" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />

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
          Exclusive access to the city's premier nightlife.
        </p>

      </div>

    </div>
  )
}

/* ---------------- RIGHT SIDE ---------------- */

function RightLogin() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 relative">

      <MobileLogo />

      <LoginCard />

      <Footer />

    </div>
  )
}

/* ---------------- MOBILE LOGO ---------------- */

function MobileLogo() {
  return (
    <div className="lg:hidden absolute top-10 left-10 flex items-center gap-3">

      <div className="size-8 text-primary">
        <svg viewBox="0 0 48 48">
          <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"/>
        </svg>
      </div>

      <h2 className="text-2xl font-bold">NOCTURNA</h2>

    </div>
  )
}

/* ---------------- LOGIN CARD ---------------- */

function LoginCard() {

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    console.log("login data", data)
  }

  return (
    <div className="w-full max-w-md bg-[#1a1023]/60 backdrop-blur border border-primary/20 p-8 sm:p-10 rounded-xl shadow-2xl">

      <div className="mb-10">
        <h3 className="text-3xl font-bold mb-2">Welcome Back</h3>
        <p className="text-slate-400">
          Please enter your credentials to access the club portal.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* EMAIL */}
        <div>
          <label className="block text-sm mb-2">Email Address</label>

          <div className="relative">

            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              mail
            </span>

            <input
              {...register("email")}
              type="email"
              placeholder="name@luxury.com"
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-background-dark/50 border border-primary/30 focus:ring-primary focus:border-primary outline-none"
            />

          </div>

          {errors.email && (
            <p className="text-red-400 text-xs mt-1">
              {errors.email.message}
            </p>
          )}

        </div>

        {/* PASSWORD */}
        <div>

          <div className="flex justify-between mb-2">
            <label className="text-sm">Password</label>
            <a className="text-xs text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="relative">

            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              lock
            </span>

            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-4 rounded-lg bg-background-dark/50 border border-primary/30 focus:ring-primary focus:border-primary outline-none"
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

          {errors.password && (
            <p className="text-red-400 text-xs mt-1">
              {errors.password.message}
            </p>
          )}

        </div>

        {/* REMEMBER */}
        <div className="flex items-center">

          <input
            type="checkbox"
            {...register("remember")}
            className="h-4 w-4 text-primary border-primary/30"
          />

          <label className="ml-2 text-sm text-slate-400">
            Remember my access
          </label>

        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg"
        >
          Enter the Night
          <span className="material-symbols-outlined">
            arrow_forward
          </span>
        </button>

      </form>

      <SocialLogin />

      <p className="mt-10 text-center text-sm text-slate-500">
        Not a member yet?{" "}
        <a className="text-primary font-bold hover:underline">
          Apply for entry
        </a>
      </p>

    </div>
  )
}

/* ---------------- SOCIAL LOGIN ---------------- */

function SocialLogin() {
  return (
    <div className="mt-10">

      <div className="relative flex items-center justify-center mb-8">
        <div className="flex-grow border-t border-primary/20" />
        <span className="mx-4 text-xs uppercase text-slate-400">
          Membership Login
        </span>
        <div className="flex-grow border-t border-primary/20" />
      </div>

      <div className="grid grid-cols-2 gap-4">

        <button className="flex items-center justify-center gap-2 py-3 rounded-lg border border-primary/20 bg-white/5 hover:bg-primary/10">
          <span className="material-symbols-outlined">stars</span>
          Apple ID
        </button>

        <button className="flex items-center justify-center gap-2 py-3 rounded-lg border border-primary/20 bg-white/5 hover:bg-primary/10">
          <span className="material-symbols-outlined">diamond</span>
          Google
        </button>

      </div>

    </div>
  )
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
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
  )
}