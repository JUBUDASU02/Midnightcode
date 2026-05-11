// components/auth/FormInput.jsx
export default function FormInput({ 
  label, 
  name, 
  type = "text", 
  placeholder, 
  register, 
  error, 
  icon = "mail",
  className = ""
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300 ml-1">{label}</label>
      <div className="relative group">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full bg-primary/5 border ${error ? 'border-red-500' : 'border-primary/20'} rounded-xl py-4 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${className}`}
        />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}