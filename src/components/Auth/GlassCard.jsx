// components/auth/GlassCard.jsx
export default function GlassCard({ children, className = "" }) {
  return (
    <div className={`glass p-8 sm:p-10 rounded-xl shadow-2xl relative overflow-hidden ${className}`}>
      <div className="absolute -top-10 -right-10 size-40 bg-primary/20 blur-3xl rounded-full" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}