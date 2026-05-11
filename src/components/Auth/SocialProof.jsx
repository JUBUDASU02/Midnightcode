// components/auth/SocialProof.jsx
export default function SocialProof({ 
  count = "2,000", 
  text = "miembros esta semana" 
}) {
  return (
    <div className="flex items-center gap-4 text-slate-400">
      <div className="flex -space-x-3">
        {[3, 5, 7].map((n) => (
          <img
            key={n}
            className="size-10 rounded-full border-2 border-background-dark"
            src={`https://i.pravatar.cc/100?img=${n}`}
            alt=""
          />
        ))}
      </div>
      <span className="text-sm font-medium">+{count} {text}</span>
    </div>
  );
}