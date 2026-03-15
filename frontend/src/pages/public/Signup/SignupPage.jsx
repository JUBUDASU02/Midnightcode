import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import AuthFooter from "../../../components/Layout/AuthFooter"

const schema = yup.object({

name: yup
.string()
.required("Name required"),

email: yup
.string()
.email("Invalid email")
.required("Email required"),

password: yup
.string()
.min(6,"Minimum 6 characters")
.required(),

confirmPassword: yup
.string()
.oneOf([yup.ref("password")],"Passwords must match")

})

export default function SignupPage(){

const {
register,
handleSubmit,
formState:{errors}
} = useForm({
resolver:yupResolver(schema)
})

const onSubmit=(data)=>{
console.log("SIGNUP DATA",data)
}

return(

<div className="flex flex-col lg:flex-row min-h-screen">

<form onSubmit={handleSubmit(onSubmit)}>

<input {...register("name")} placeholder="Name"/>

{errors.name && <p>{errors.name.message}</p>}

<input {...register("email")} placeholder="Email"/>

{errors.email && <p>{errors.email.message}</p>}

<input type="password" {...register("password")} placeholder="Password"/>

{errors.password && <p>{errors.password.message}</p>}

<input type="password" {...register("confirmPassword")} placeholder="Confirm Password"/>

{errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

<button type="submit">Create account</button>

</form>

<AuthFooter/>

</div>

)

}
