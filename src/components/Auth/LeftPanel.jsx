// components/auth/LeftPanel.jsx
export default function LeftPanel({ 
  title = "ECLIPSE", 
  subtitle = "Reconnect with the rhythm. Reset your access to the city's most exclusive beats.",
  icon = "auto_awesome",
  backgroundImage,
  showDots = true,
  showEstablished = false
}) {
  return (
    <div className="hidden md:flex relative w-1/2 h-full overflow-hidden bg-background-dark">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background-dark to-black z-10"></div>
      
      {backgroundImage && (
        <div
          className="absolute inset-0 opacity-60 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center z-20 p-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <span className="material-symbols-outlined text-5xl">{icon}</span>
            <h1 className="text-4xl font-bold tracking-tighter uppercase">{title}</h1>
          </div>
          <p className="text-slate-300 text-xl max-w-md font-light leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {showDots && (
        <div className="absolute bottom-10 left-10 z-20 flex gap-4">
          <div className="w-12 h-1 bg-primary rounded-full"></div>
          <div className="w-12 h-1 bg-primary/20 rounded-full"></div>
          <div className="w-12 h-1 bg-primary/20 rounded-full"></div>
        </div>
      )}

      {showEstablished && (
        <div className="absolute bottom-10 left-10 text-slate-400 text-sm tracking-widest z-20">
          EST. 2024 • PREMIUM EXPERIENCE
        </div>
      )}
    </div>
  );
}