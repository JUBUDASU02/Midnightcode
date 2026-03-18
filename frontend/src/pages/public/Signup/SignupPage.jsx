import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  name: yup.string().min(2).required("Nombre requerido"),
  email: yup.string().email().required("Correo requerido"),
  password: yup.string().min(6).required("Contraseña requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "No coinciden")
    .required("Confirma tu contraseña"),
  terms: yup.boolean().oneOf([true], "Debes aceptar"),
});

export default function Register() {
  const { register: authRegister, authError, clearError } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    clearError();
    const result = authRegister({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-background-dark text-slate-100 font-display">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center px-12 overflow-hidden border-r border-primary/10">

        {/* background particles */}
        <div className="absolute inset-0 z-0 particle-bg"></div>

        {/* background image */}
        <div
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCaImGNaf6GN-yEnYZestmJpYdxUZaiQgv1gSLFHvBJMcqJ9F3a17dfLknw_MXDkEPOJDSlZJXRSlzLTUKJIM3kNaYxv49pgqYvEiMSDvJStRG8R-6Vpy173OfqeG1jFg92aDQvlv3XTS_uZH-qcxaHsTpfe7yRwYUXX96XIL42f8bi-hUjXp3IHq2vYRLGq1Jjz-8MM6LdBfID95QaiyPKzKOHMUyVTVouhGqXk2OVlU1mjY0MxX6DAKRage5FgF5Ebi0M7MqYjPU')"
          }}
        />

        <div className="relative z-10 flex flex-col items-start max-w-md">

          {/* logo */}
          <div className="flex items-center gap-3 mb-12">
            <span className="material-symbols-outlined text-primary text-4xl">
              diamond
            </span>

            <span className="text-3xl font-bold uppercase">
              Elite Nightlife
            </span>
          </div>

          {/* title */}
          <h1 className="text-6xl xl:text-8xl font-black leading-none tracking-tight mb-6 uppercase">
            Join the <br />
            <span className="text-primary text-glow">
              Elite
            </span>
          </h1>

          <p className="text-xl text-slate-400 font-medium max-w-sm mb-8">
            Gain exclusive access to the city's most prestigious events and VIP experiences.
          </p>

          {/* avatars */}
          <div className="flex items-center gap-4 text-slate-400">

            <div className="flex -space-x-3">

              <img
                className="size-10 rounded-full border-2 border-background-dark"
                src="https://i.pravatar.cc/100?img=3"
              />

              <img
                className="size-10 rounded-full border-2 border-background-dark"
                src="https://i.pravatar.cc/100?img=5"
              />

              <img
                className="size-10 rounded-full border-2 border-background-dark"
                src="https://i.pravatar.cc/100?img=7"
              />

            </div>

            <span className="text-sm font-medium">
              Joined by 2,000+ members this week
            </span>

          </div>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12">

        <div className="w-full max-w-md">

          {/* mobile logo */}
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

          {/* form card */}
          <div className="glass p-8 sm:p-10 rounded-xl shadow-2xl relative overflow-hidden">

            <div className="absolute -top-10 -right-10 size-40 bg-primary/20 blur-3xl rounded-full"></div>

            <div className="relative z-10">

              <h2 className="text-3xl font-bold mb-2">
                Create Membership
              </h2>

              <p className="text-slate-400 mb-8">
                Please enter your details to request your digital pass.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* name */}
                <div className="space-y-2">

                  <label className="text-sm text-slate-300 ml-1">
                    Full Name
                  </label>

                  <div className="relative">

                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      person
                    </span>

                    <input
                      type="text"
                      placeholder="John Doe"
                      {...register("name")}
                      className="w-full pl-12 pr-4 py-4 bg-primary/5 border border-primary/20 rounded-xl text-slate-100 placeholder:text-slate-600 focus:ring-2 focus:ring-primary/40"
                    />

                  </div>

                  <p className="text-red-400 text-xs">
                    {errors.name?.message}
                  </p>

                </div>

                {/* email */}
                <div className="space-y-2">

                  <label className="text-sm text-slate-300 ml-1">
                    Email Address
                  </label>

                  <div className="relative">

                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      mail
                    </span>

                    <input
                      type="email"
                      placeholder="name@example.com"
                      {...register("email")}
                      className="w-full pl-12 pr-4 py-4 bg-primary/5 border border-primary/20 rounded-xl text-slate-100 placeholder:text-slate-600 focus:ring-2 focus:ring-primary/40"
                    />

                  </div>

                  <p className="text-red-400 text-xs">
                    {errors.email?.message}
                  </p>

                </div>

                {/* password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="space-y-2">

                    <label className="text-sm text-slate-300 ml-1">
                      Password
                    </label>

                    <input
                      type="password"
                      placeholder="••••••"
                      {...register("password")}
                      className="w-full px-4 py-4 bg-primary/5 border border-primary/20 rounded-xl text-slate-100"
                    />

                    <p className="text-red-400 text-xs">
                      {errors.password?.message}
                    </p>

                  </div>

                  <div className="space-y-2">

                    <label className="text-sm text-slate-300 ml-1">
                      Confirm
                    </label>

                    <input
                      type="password"
                      placeholder="••••••"
                      {...register("confirmPassword")}
                      className="w-full px-4 py-4 bg-primary/5 border border-primary/20 rounded-xl text-slate-100"
                    />

                    <p className="text-red-400 text-xs">
                      {errors.confirmPassword?.message}
                    </p>

                  </div>

                </div>

                {/* checkbox */}
                <div className="flex items-start gap-2 pt-2">

                  <input
                    type="checkbox"
                    {...register("terms")}
                    className="size-4 mt-1 rounded border-primary/30 bg-primary/10 text-primary"
                  />

                  <label className="text-xs text-slate-400">
                    I agree to the Terms of Service and Privacy Policy
                  </label>

                </div>

                <p className="text-red-400 text-xs">
                  {errors.terms?.message}
                </p>

                {authError ? (
                  <p className="text-red-400 text-center text-sm">
                    {authError}
                  </p>
                ) : null}

                {/* submit */}
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl neon-glow flex items-center justify-center gap-2"
                >
                  Get My Pass
                </button>

              </form>

              {/* social login */}
              <div className="mt-8 flex flex-col items-center gap-4">

                <p className="text-sm text-slate-400">
                  Already a member? Log in here
                </p>

                <div className="flex gap-4 w-full">

                  <button className="flex-1 py-3 bg-white text-black rounded-lg flex items-center justify-center gap-2">

                    <span className="material-symbols-outlined">
                      diamond
                    </span>

                    Apple

                  </button>

                  <button className="flex-1 py-3 bg-white text-black rounded-lg flex items-center justify-center gap-2">

                    <span className="material-symbols-outlined">
                      stars
                    </span>

                    Google

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
