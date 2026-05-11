// components/auth/SubmitButton.jsx
export default function SubmitButton({ 
  children, 
  loading = false, 
  loadingText = "Processing...", 
  icon = "send",
  className = ""
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg neon-glow transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${className}`}
    >
      {loading ? loadingText : children}
      {icon && <span className="material-symbols-outlined text-xl">{icon}</span>}
    </button>
  );
}