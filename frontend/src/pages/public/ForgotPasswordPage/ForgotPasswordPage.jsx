<<<<<<< HEAD
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
=======
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import AuthFooter from "../../../components/Layout/AuthFooter"
>>>>>>> b4ef4ea (featu:Home)

const schema = yup.object({
  email: yup
    .string()
<<<<<<< HEAD
    .email("Invalid email")
    .required("Email is required")
});

export default function ForgotPassword() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center p-0 md:p-6 overflow-hidden">

      <div className="relative w-full max-w-6xl h-full md:h-[800px] flex flex-col md:flex-row overflow-hidden rounded-none md:rounded-xl shadow-2xl bg-background-dark">

        {/* LEFT PANEL */}
        <div className="hidden md:flex relative w-1/2 h-full overflow-hidden bg-background-dark">

          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background-dark to-black z-10"></div>

          <div
            className="absolute inset-0 opacity-60 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://lh3.googleusercontent.com/aida-public/AB6AXuDbCWdIi07fC21qGp_MK1QdyOPX7qp3IFpLmjCvebBWP1Vv0hPDSuN-3hJWnV_KXqnE9ouzdC08xR8ZRau4vObp3TViedAgNuVbv2K4h1-fWFj5LIlyhmZCH3lHkAEJt9HOCPHDexasDVAPoYDjqqDOWPGomV09J148xNvOk-6Xfju4lcrVHYJ9g2i90B0dvCX9mDMbjRPtgu6vbTT7RdvJLEnaf-RVh-9k1Zwab5293K9zEDqq6-BHtEOMS3ZQA39sWC2eDcXX-rI)"
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center z-20 p-12">
            <div className="space-y-6">

              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined text-5xl">
                  auto_awesome
                </span>
                <h1 className="text-4xl font-bold tracking-tighter uppercase">
                  Eclipse
                </h1>
              </div>

              <p className="text-slate-300 text-xl max-w-md font-light leading-relaxed">
                Reconnect with the rhythm. Reset your access to the city's
                most exclusive beats.
              </p>

            </div>
          </div>

          <div className="absolute bottom-10 left-10 z-20 flex gap-4">
            <div className="w-12 h-1 bg-primary rounded-full"></div>
            <div className="w-12 h-1 bg-primary/20 rounded-full"></div>
            <div className="w-12 h-1 bg-primary/20 rounded-full"></div>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 h-full flex flex-col p-8 md:p-16 relative bg-background-dark">

          {/* HEADER */}
          <header className="flex items-center justify-between mb-20">

            <div className="flex md:hidden items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl">
                auto_awesome
              </span>
              <span className="font-bold text-xl uppercase tracking-widest">
                Eclipse
              </span>
            </div>

            <a className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group">
              <span className="text-sm font-medium">
                Back to Login
              </span>

              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>

          </header>


          {/* FORM AREA */}
          <main className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">

            <div className="mb-10">

              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <span className="material-symbols-outlined text-3xl text-primary">
                  lock_reset
                </span>
              </div>

              <h2 className="text-4xl font-bold text-slate-100 mb-4 tracking-tight">
                Forgot password?
              </h2>

              <p className="text-slate-400 text-lg">
                Enter your email and we'll send you a recovery link.
              </p>

            </div>


            {/* FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >

              <div className="space-y-2">

                <label className="text-sm font-medium text-slate-300 ml-1">
                  Email Address
                </label>

                <div className="relative group">

                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                    mail
                  </span>

                  <input
                    type="email"
                    placeholder="dj@eclipse-club.com"
                    {...register("email")}
                    className="w-full bg-primary/5 border border-primary/20 rounded-xl py-4 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />

                </div>

                <p className="text-red-400 text-sm">
                  {errors.email?.message}
                </p>

              </div>


              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg neon-glow transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Send Reset Link</span>

                <span className="material-symbols-outlined text-xl">
                  send
                </span>
              </button>

            </form>


            {/* INFO BOX */}
            <div className="mt-12 p-6 rounded-xl glass-panel">

              <div className="flex items-start gap-4">

                <span className="material-symbols-outlined text-primary">
                  info
                </span>

                <p className="text-sm text-slate-400 leading-relaxed">
                  If you don't see the email within 5 minutes,
                  check your spam folder.
                </p>

              </div>

            </div>

          </main>


          {/* FOOTER */}
          <footer className="mt-auto pt-8 flex justify-center gap-6 text-slate-600 text-xs uppercase tracking-widest">

            <a className="hover:text-primary transition-colors">
              Privacy
            </a>

            <a className="hover:text-primary transition-colors">
              Terms
            </a>

            <a className="hover:text-primary transition-colors">
              Support
            </a>

          </footer>

        </div>


        {/* BACKGROUND BLOBS */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="absolute bottom-[-10%] left-[40%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      </div>

    </div>
  );
=======
    .email("Invalid email address")
    .required("Email is required")
})

export default function ForgotPasswordPage(){

const {
  register,
  handleSubmit,
  formState:{errors}
} = useForm({
  resolver: yupResolver(schema)
})

const onSubmit = (data)=>{
  console.log("FORGOT PASSWORD", data)
}

return(

<div className="flex flex-col lg:flex-row min-h-screen w-full bg-background-light dark:bg-background-dark font-display">

{/* LEFT */}

<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-background-dark">

<div
className="absolute inset-0 bg-cover bg-center opacity-60"
style={{
backgroundImage:
"url('https://lh3.googleusercontent.com/aida-public/FORGOT_IMAGE_URL')",
}}
/>

<div className="absolute inset-0 bg-gradient-to-br from-black/60 to-background-dark" />

</div>

{/* RIGHT */}

<div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 relative">

<div className="w-full max-w-md bg-[#1a1023]/60 backdrop-blur border border-primary/20 p-10 rounded-xl shadow-2xl">

<h3 className="text-3xl font-bold mb-6">
Forgot Password
</h3>

<p className="text-slate-400 mb-8">
Enter your email and we'll send a reset link.
</p>

<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

<input
type="email"
placeholder="name@email.com"
{...register("email")}
className="w-full px-4 py-4 rounded-lg bg-background-dark/50 border border-primary/30 text-white"
/>

{errors.email && (
<p className="text-red-400 text-xs">
{errors.email.message}
</p>
)}

<button
type="submit"
className="w-full py-4 bg-primary text-white rounded-lg font-bold"
>
Send Reset Link
</button>

</form>

</div>

<AuthFooter/>

</div>

</div>

)

>>>>>>> b4ef4ea (featu:Home)
}
