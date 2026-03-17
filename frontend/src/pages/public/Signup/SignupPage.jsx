import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Esquema de validación con Yup
const schema = yup.object({
  fullName: yup
    .string()
    .required("El nombre completo es obligatorio")
    .min(3, "Mínimo 3 caracteres"),
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("El correo es obligatorio"),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(6, "Mínimo 6 caracteres"),
  confirmPassword: yup
    .string()
    .required("Debes confirmar la contraseña")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
  terms: yup
    .boolean()
    .oneOf([true], "Debes aceptar los términos y condiciones")
    .required(),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Datos del formulario:", data);
    // Aquí iría la lógica para enviar los datos al servidor
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
              Vida Nocturna Elite
            </span>
          </div>

          {/* title */}
          <h1 className="text-6xl xl:text-8xl font-black leading-none tracking-tight mb-6 uppercase">
            Únete a la <br />
            <span className="text-primary text-glow">Elite</span>
          </h1>

          <p className="text-xl text-slate-400 font-medium max-w-sm mb-8">
            Obtén acceso exclusivo a los eventos más prestigiosos<br/>
            y experiencias VIP de la ciudad.
          </p>

          {/* avatars */}
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex -space-x-3">
              <img
                className="size-10 rounded-full border-2 border-background-dark"
                src="https://i.pravatar.cc/100?img=3"
                alt="avatar"
              />
              <img
                className="size-10 rounded-full border-2 border-background-dark"
                src="https://i.pravatar.cc/100?img=5"
                alt="avatar"
              />
              <img
                className="size-10 rounded-full border-2 border-background-dark"
                src="https://i.pravatar.cc/100?img=7"
                alt="avatar"
              />
            </div>
            <span className="text-sm font-medium">
              Más de 100 miembros se unieron esta semana
            </span>
          </div>
        </div>
        <Link to={"/"}>
          <button className="absolute top-10 right-10 flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold uppercase text-xs tracking-widest">
            <span className="material-symbols-outlined">arrow_back</span>
            Volver al Inicio
          </button>
        </Link>
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
              <span className="text-2xl font-bold uppercase">Elite</span>
            </div>
          </div>

          {/* form card */}
          <div className="glass p-8 sm:p-10 rounded-xl shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 size-40 bg-primary/20 blur-3xl rounded-full"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">Unirte</h2>
              <p className="text-slate-400 mb-8">
                Por favor, introduzca sus datos para registrarse a la fiesta.
              </p>

              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {/* name */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-300 ml-1">
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      person
                    </span>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={`w-full pl-12 pr-4 py-4 bg-primary/5 border rounded-xl text-slate-100 placeholder:text-slate-600 focus:ring-2 focus:ring-primary/40 ${
                        errors.fullName ? "border-red-500" : "border-primary/20"
                      }`}
                      {...register("fullName")}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* email */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-300 ml-1">
                    Correo Electronico
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      mail
                    </span>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className={`w-full pl-12 pr-4 py-4 bg-primary/5 border rounded-xl text-slate-100 placeholder:text-slate-600 focus:ring-2 focus:ring-primary/40 ${
                        errors.email ? "border-red-500" : "border-primary/20"
                      }`}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-300 ml-1">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      placeholder="••••••"
                      className={`w-full px-4 py-4 bg-primary/5 border rounded-xl text-slate-100 focus:ring-2 focus:ring-primary/40 ${
                        errors.password ? "border-red-500" : "border-primary/20"
                      }`}
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-300 ml-1">
                      Confirmar
                    </label>
                    <input
                      type="password"
                      placeholder="••••••"
                      className={`w-full px-4 py-4 bg-primary/5 border rounded-xl text-slate-100 focus:ring-2 focus:ring-primary/40 ${
                        errors.confirmPassword ? "border-red-500" : "border-primary/20"
                      }`}
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                {/* checkbox */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-primary/30 bg-primary/10 text-primary focus:ring-primary/40"
                    {...register("terms")}
                  />
                  <label className="text-xs text-slate-400">
                    Acepto los Términos de Servicio y la Política de Privacidad
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-red-400 text-xs mt-1">{errors.terms.message}</p>
                )}

                {/* submit */}
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl neon-glow flex items-center justify-center gap-2"
                >
                  Unete al Club
                </button>
              </form>

              {/* social login */}
              <div className="mt-8 flex flex-col items-center gap-4">
                <p className="text-sm text-slate-400">
                  ¿Ya eres miembro?{" "}
                  <Link
                    to="/login"
                    className="text-primary font-bold hover:underline cursor-pointer"
                  >
                    Inicia sesión aquí
                  </Link>
                </p>

                <div className="flex gap-4 w-full">
                  <button className="flex-1 py-3 bg-white text-black rounded-lg flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">diamond</span>
                    Apple
                  </button>

                  <button className="flex-1 py-3 bg-white text-black rounded-lg flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">stars</span>
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