// components/auth/AuthLayout.jsx
export default function AuthLayout({ children, className = "" }) {
  return (
    <div className={`bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center p-0 md:p-6 overflow-hidden ${className}`}>
      <div className="relative w-full max-w-6xl h-full md:h-[800px] flex flex-col md:flex-row overflow-hidden rounded-none md:rounded-xl shadow-2xl bg-background-dark">
        {children}
      </div>
    </div>
  );
}