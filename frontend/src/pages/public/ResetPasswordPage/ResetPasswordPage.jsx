<<<<<<< HEAD
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
=======
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

/* ---------------- VALIDATION ---------------- */
>>>>>>> b4ef4ea (featu:Home)

const schema = yup.object({
  password: yup
    .string()
<<<<<<< HEAD
    .min(12, "Minimum 12 characters")
    .required("Password required"),
=======
    .required("Password required")
    .min(12, "Minimum 12 characters")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[!@#$%^&*]/, "Must contain a symbol"),
>>>>>>> b4ef4ea (featu:Home)

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
<<<<<<< HEAD
});

export default function ResetPassword() {

  const [showPass, setShowPass] = useState(false);
=======
})

/* ---------------- PAGE ---------------- */

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background-dark font-display">

      <LeftVisual />

      <div className="flex-1 flex items-center justify-center p-6 lg:p-20">
        <ResetForm />
      </div>

    </div>
  )
}

/* ---------------- LEFT VISUAL ---------------- */

function LeftVisual() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden">

      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center p-12">

        <div className="mb-8 w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center shadow-[0_0_20px_rgba(127,13,242,0.5)]">
          <span className="material-symbols-outlined text-5xl text-white">
            flare
          </span>
        </div>

        <h1 className="text-6xl font-bold italic text-white">
          ECLIPSE
        </h1>

        <p className="text-primary tracking-[0.3em] uppercase">
          Nightlife redefined
        </p>

      </div>

      <div className="absolute bottom-10 left-10 text-slate-400 text-sm tracking-widest">
        EST. 2024 • PREMIUM EXPERIENCE
      </div>

    </div>
  )
}

/* ---------------- FORM ---------------- */

function ResetForm() {
>>>>>>> b4ef4ea (featu:Home)

  const {
    register,
    handleSubmit,
<<<<<<< HEAD
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-hidden">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden">

        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center p-12">

          <div className="mb-8 w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center neon-glow">
            <span className="material-symbols-outlined text-5xl text-white">
              flare
            </span>
          </div>

          <h1 className="text-6xl font-bold tracking-tighter text-white mb-4 italic">
            ECLIPSE
          </h1>

          <p className="text-primary font-medium tracking-[0.3em] uppercase mb-8">
            Nightlife redefined
          </p>

          <div className="w-full max-w-md aspect-square rounded-full border border-primary/20 flex items-center justify-center relative">

            <div className="absolute inset-0 rounded-full border border-primary/10 scale-110"></div>
            <div className="absolute inset-0 rounded-full border border-primary/5 scale-125"></div>

            <div className="w-64 h-64 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-2xl"></div>

            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP2XP67NEeGGAaRlZ7PjYoqmIckNefPRsPNQbyJAXADoP8aZEEnwavni4b9XUt43cl1jP4H6Qgql7rtPnKKRXT87OAdV68w35jAjZCgxsnfDoSBTp02QaTJBZcF2RSjn6LimjquWuqlD9JWNG1JEofqxQllhAbNTfB-SdgCW9zSpfgPQbkzyfavfyh2qHlyDSBnvk1tHRCyJrVJW7-MqfG9rPcKrtAjtwAzZ1_g6ZckyeRK547iybgAQe8Xq0EvY9Z6dGXbjm2Ytc"
              className="w-80 h-80 object-cover rounded-full opacity-60 mix-blend-screen"
            />
          </div>

        </div>

        <div className="absolute bottom-10 left-10 text-slate-400 text-sm font-light tracking-widest">
          EST. 2024 • PREMIUM EXPERIENCE
        </div>
      </div>


      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-20 relative bg-background-dark">

        {/* MOBILE LOGO */}
        <div className="lg:hidden flex items-center gap-3 mb-12">
          <span className="material-symbols-outlined text-primary text-3xl">
            flare
          </span>
          <span className="text-2xl font-bold text-white italic">
            ECLIPSE
          </span>
        </div>

        <div className="w-full max-w-md glass-panel p-8 lg:p-10 rounded-xl">

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              Reset Password
            </h2>

            <p className="text-slate-400">
              Secure your account with a new password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-sm text-slate-300">
                New Password
              </label>

              <div className="relative">

                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full bg-background-dark/50 border border-primary/30 rounded-lg py-4 px-4 text-white focus:ring-2 focus:ring-primary outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary"
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


            {/* CONFIRM PASSWORD */}
            <div className="space-y-2">
              <label className="text-sm text-slate-300">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                className="w-full bg-background-dark/50 border border-primary/30 rounded-lg py-4 px-4 text-white focus:ring-2 focus:ring-primary outline-none"
              />

              <p className="text-red-400 text-sm">
                {errors.confirmPassword?.message}
              </p>
            </div>


            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-all neon-glow flex items-center justify-center gap-2"
            >
              Update Password
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>

          </form>


          <div className="mt-8 pt-8 border-t border-primary/10">
            <a className="text-sm text-slate-400 hover:text-white flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">
                keyboard_backspace
              </span>
              Back to login
            </a>
          </div>

        </div>

        <div className="mt-12 flex gap-6 text-xs text-slate-600 uppercase tracking-widest">
          <a className="hover:text-primary">Privacy</a>
          <a className="hover:text-primary">Terms</a>
          <a className="hover:text-primary">Help Center</a>
        </div>

      </div>
    </div>
  );
}
=======
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const password = watch("password","")

  const onSubmit = (data) => {
    console.log("reset password", data)
  }

  return (
    <div className="w-full max-w-md bg-[#191022]/60 backdrop-blur border border-primary/20 p-8 lg:p-10 rounded-xl">

      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-3">
          Reset Password
        </h2>

        <p className="text-slate-400">
          Secure your account with a new strong password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <PasswordInput
          label="New Password"
          name="password"
          register={register}
          error={errors.password}
        />

        <PasswordStrength password={password} />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition transform hover:scale-[1.02]"
        >
          Update Password
        </button>

      </form>

      <div className="mt-8 pt-8 border-t border-primary/10">
        <a className="text-sm text-slate-400 hover:text-white flex justify-center gap-2">
          <span className="material-symbols-outlined text-sm">
            keyboard_backspace
          </span>
          Back to login
        </a>
      </div>

    </div>
  )
}

/* ---------------- PASSWORD INPUT ---------------- */

function PasswordInput({ label, name, register, error }) {

  const [show, setShow] = useState(false)

  return (
    <div className="space-y-2">

      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      <div className="relative">

        <input
          type={show ? "text" : "password"}
          {...register(name)}
          placeholder="••••••••"
          className="w-full bg-background-dark/50 border border-primary/30 rounded-lg py-4 px-4 text-white focus:ring-2 focus:ring-primary outline-none"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary"
        >
          <span className="material-symbols-outlined">
            visibility
          </span>
        </button>

      </div>

      {error && (
        <p className="text-xs text-red-400">
          {error.message}
        </p>
      )}

    </div>
  )
}

/* ---------------- PASSWORD STRENGTH ---------------- */

function PasswordStrength({ password }) {

  const checks = [
    password.length >= 12,
    /[0-9]/.test(password),
    /[!@#$%^&*]/.test(password),
  ]

  const strength = checks.filter(Boolean).length
  const label = ["Weak", "Medium", "Strong", "Very Strong"][strength]

  return (
    <div className="space-y-3">

      <div className="flex justify-between text-xs uppercase">
        <span className="text-slate-400">
          Security Strength
        </span>

        <span className="text-primary">
          {label}
        </span>
      </div>

      <div className="flex gap-1.5 h-1.5 w-full">
        {[0,1,2,3].map((i) => (
          <div
            key={i}
            className={`flex-1 rounded-full ${
              i <= strength
                ? "bg-primary shadow-[0_0_10px_rgba(127,13,242,0.6)]"
                : "bg-primary/20"
            }`}
          />
        ))}
      </div>

      <p className="text-[10px] text-slate-500">
        Include at least 12 characters, a symbol, and a number.
      </p>

    </div>
  )
}
>>>>>>> b4ef4ea (featu:Home)
