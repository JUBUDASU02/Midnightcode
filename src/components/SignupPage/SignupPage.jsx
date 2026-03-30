import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

/* ---------------- VALIDATION ---------------- */

const schema = yup.object({
  name: yup.string().required("Name required"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email required"),

  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
})

/* ---------------- PAGE ---------------- */

export default function SignupPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-background-light dark:bg-background-dark font-display">

      <LeftVisual />

      <RightSignup />

    </div>
  )
}

/* ---------------- LEFT VISUAL ---------------- */

function LeftVisual() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center px-12 overflow-hidden border-r border-primary/10">

      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(127,13,242,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(127,13,242,0.1)_0%,transparent_50%)]" />

        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://lh3.googleusercontent.com/aida-public/AB6AXuCaImGNaf6GN-yEnYZestmJpYdxUZaiQgv1gSLFHvBJMcqJ9F3a17dfLknw_MXDkEPOJDSlZJXRSlzLTUKJIM3kNaYxv49pgqYvEiMSDvJStRG8R-6Vpy173OfqeG1jFg92aDQvlv3XTS_uZH-qcxaHsTpfe7yRwYUXX96XIL42f8bi-hUjXp3IHq2vYRLGq1Jjz-8MM6LdBfID95QaiyPKzKOHMUyVTVouhGqXk2OVlU1mjY0MxX6DAKRage5FgF5Ebi0M7MqYjPU)"
          }}
        />

      </div>

      <div className="relative z-10 flex flex-col items-start max-w-md">

        <div className="flex items-center gap-3 mb-12">

          <svg className="size-10 text-primary" viewBox="0 0 48 48">
            <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"/>
          </svg>

          <span className="text-3xl font-bold uppercase">
            Elite Nightlife
          </span>

        </div>

        <h1 className="text-6xl xl:text-8xl font-black leading-none mb-6 uppercase">
          Join the <br />
          <span className="text-primary drop-shadow-[0_0_10px_rgba(127,13,242,0.8)]">
            Elite
          </span>
        </h1>

        <p className="text-xl text-slate-400 mb-8 max-w-sm">
          Gain exclusive access to the city's most prestigious events and VIP experiences.
        </p>

        <div className="flex items-center gap-4 text-slate-400">

          <div className="flex -space-x-3">

            <img className="size-10 rounded-full border-2 border-background-dark" src="https://i.pravatar.cc/100?img=1"/>
            <img className="size-10 rounded-full border-2 border-background-dark" src="https://i.pravatar.cc/100?img=2"/>
            <img className="size-10 rounded-full border-2 border-background-dark" src="https://i.pravatar.cc/100?img=3"/>

          </div>

          <span className="text-sm">
            Joined by 2,000+ members this week
          </span>

        </div>

      </div>

    </div>
  )
}

/* ---------------- RIGHT SIDE ---------------- */

function RightSignup() {
  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12">

      <MobileLogo />

      <SignupCard />

    </div>
  )
}

/* ---------------- MOBILE LOGO ---------------- */

function MobileLogo() {
  return (
    <div className="lg:hidden flex justify-center mb-8">

      <div className="flex items-center gap-2">

        <span className="material-symbols-outlined text-primary text-3xl">
          diamond
        </span>

        <span className="text-2xl font-bold uppercase">
          Elite
        </span>

      </div>

    </div>
  )
}

/* ---------------- SIGNUP CARD ---------------- */

function SignupCard() {

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    console.log("signup data", data)
  }

  return (
    <div className="w-full max-w-md bg-[#1a1023]/60 backdrop-blur border border-primary/20 p-8 sm:p-10 rounded-xl shadow-2xl relative overflow-hidden">

      <div className="absolute -top-10 -right-10 size-40 bg-primary/20 blur-3xl rounded-full"/>

      <div className="relative z-10">

        <h2 className="text-3xl font-bold mb-2">
          Create Membership
        </h2>

        <p className="text-slate-400 mb-8">
          Please enter your details to request your digital pass.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* NAME */}
          <InputField
            label="Full Name"
            icon="person"
            register={register}
            name="name"
            placeholder="John Doe"
            error={errors.name}
          />

          {/* EMAIL */}
          <InputField
            label="Email Address"
            icon="mail"
            register={register}
            name="email"
            placeholder="name@example.com"
            error={errors.email}
          />

          {/* PASSWORD */}
          <InputField
            label="Password"
            icon="lock"
            type={showPassword ? "text" : "password"}
            register={register}
            name="password"
            placeholder="••••••••"
            error={errors.password}
          />

          {/* CONFIRM */}
          <InputField
            label="Confirm Password"
            icon="shield"
            type="password"
            register={register}
            name="confirmPassword"
            placeholder="••••••••"
            error={errors.confirmPassword}
          />

          {/* TERMS */}

          <div className="flex items-center gap-2 pt-2">

            <input
              type="checkbox"
              className="size-4 rounded border-primary/30 bg-primary/10"
            />

            <label className="text-xs text-slate-400">
              I agree to the
              <span className="text-primary ml-1">Terms</span>
              {" "}and{" "}
              <span className="text-primary">Privacy Policy</span>
            </label>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
          >

            Get My Pass

            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>

          </button>

        </form>

        <SocialLogin />

      </div>

    </div>
  )
}

/* ---------------- INPUT FIELD ---------------- */

function InputField({
  label,
  icon,
  register,
  name,
  placeholder,
  type = "text",
  error
}) {

  return (
    <div className="space-y-2">

      <label className="text-sm text-slate-300">
        {label}
      </label>

      <div className="relative">

        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
          {icon}
        </span>

        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 bg-primary/5 border border-primary/20 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/40"
        />

      </div>

      {error && (
        <p className="text-red-400 text-xs">
          {error.message}
        </p>
      )}

    </div>
  )
}

/* ---------------- SOCIAL LOGIN ---------------- */

function SocialLogin() {

  return (
    <div className="mt-8 flex flex-col items-center gap-4">

      <p className="text-sm text-slate-400">
        Already a member?
        <span className="text-primary ml-1 font-semibold">
          Log in here
        </span>
      </p>

      <div className="flex items-center w-full gap-4">

        <div className="h-px bg-primary/20 flex-1"/>

        <span className="text-xs text-slate-500 uppercase">
          or continue with
        </span>

        <div className="h-px bg-primary/20 flex-1"/>

      </div>

      <div className="flex gap-4 w-full">

        <button className="flex-1 py-3 bg-white/5 border border-primary/10 rounded-lg hover:bg-white/10 flex items-center justify-center">
          Google
        </button>

        <button className="flex-1 py-3 bg-white/5 border border-primary/10 rounded-lg hover:bg-white/10 flex items-center justify-center">
          Apple
        </button>

      </div>

    </div>
  )
}