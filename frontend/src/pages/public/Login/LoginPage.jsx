import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import AuthFooter from "../../../components/Layout/AuthFooter"

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required")
})

export default function LoginPage(){

const {
  register,
  handleSubmit,
  formState:{errors}
} = useForm({
  resolver: yupResolver(schema)
})

const onSubmit = (data)=>{
  console.log("LOGIN DATA",data)
}

return(

<div className="flex flex-col lg:flex-row min-h-screen w-full bg-background-light dark:bg-background-dark font-display">

{/* LEFT PANEL */}

<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-background-dark">

<div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background-dark to-black z-10"/>

<div
className="absolute inset-0 opacity-60 bg-cover bg-center"
style={{
backgroundImage:
"url('https://lh3.googleusercontent.com/aida-public/LOGIN_IMAGE_URL')"
}}
/>

</div>

{/* RIGHT PANEL */}

<div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 relative">

<div className="w-full max-w-md bg-[#1a1023]/60 backdrop-blur border border-primary/20 p-10 rounded-xl shadow-2xl">

<h3 className="text-3xl font-bold mb-6">Welcome Back</h3>

<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

{/* EMAIL */}

<div>

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

</div>

{/* PASSWORD */}

<div>

<input
type="password"
placeholder="••••••••"
{...register("password")}
className="w-full px-4 py-4 rounded-lg bg-background-dark/50 border border-primary/30 text-white"
/>

{errors.password && (
<p className="text-red-400 text-xs">
{errors.password.message}
</p>
)}

</div>

<button
type="submit"
className="w-full py-4 bg-primary text-white rounded-lg font-bold"
>
Enter the Night
</button>

</form>

</div>

<AuthFooter/>

</div>

</div>

)

}
