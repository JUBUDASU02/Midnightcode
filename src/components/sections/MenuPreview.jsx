export default function MenuPreview() {
  return (
    <section className="py-24 px-6 relative bg-background-dark/80 overflow-hidden" id="menu">
      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">
            Liquidos Luxury
          </h2>

          <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase">
            Vista del Menú
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Cocktails */}
          <div className="space-y-8">

            <h4 className="text-2xl font-black text-white uppercase italic border-b border-primary/30 pb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">
                local_bar
              </span>
              Cócteles de Autor
            </h4>

            <div className="space-y-6">

              <div className="flex justify-between items-start group">
                <div className="flex-1">
                  <h5 className="text-lg font-bold text-white group-hover:text-primary transition-colors uppercase tracking-wider">
                    Ultraviolet Fusion
                  </h5>
                  <p className="text-slate-400 text-sm italic">
                    Artisan Gin, Butterfly Pea, Lavender Mist, 24K Gold Flakes
                  </p>
                </div>
                <span className="text-primary font-black text-xl">$45</span>
              </div>

              <div className="flex justify-between items-start group">
                <div className="flex-1">
                  <h5 className="text-lg font-bold text-white group-hover:text-primary transition-colors uppercase tracking-wider">
                    Neon Noir Old Fashioned
                  </h5>
                  <p className="text-slate-400 text-sm italic">
                    Smoked Japanese Whisky, Black Walnut Bitters, Activated Charcoal
                  </p>
                </div>
                <span className="text-primary font-black text-xl">$52</span>
              </div>

              <div className="flex justify-between items-start group">
                <div className="flex-1">
                  <h5 className="text-lg font-bold text-white group-hover:text-primary transition-colors uppercase tracking-wider">
                    Electronic Zen
                  </h5>
                  <p className="text-slate-400 text-sm italic">
                    Veuve Clicquot, Yuzu Essence, Hibiscus Cloud, Shiso Infusion
                  </p>
                </div>
                <span className="text-primary font-black text-xl">$38</span>
              </div>

            </div>
          </div>

          {/* Bottles */}
          <div className="space-y-8">

            <h4 className="text-2xl font-black text-white uppercase italic border-b border-primary/30 pb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">
                wine_bar
              </span>
              Botellas de Prestigio
            </h4>

            <div className="space-y-6">

              <div className="flex justify-between items-start group">
                <div className="flex-1">
                  <h5 className="text-lg font-bold text-white group-hover:text-primary transition-colors uppercase tracking-wider">
                    Ace of Spades Rosé
                  </h5>
                  <p className="text-slate-400 text-sm italic">
                    Armand de Brignac, Champagne, France (750ml)
                  </p>
                </div>
                <span className="text-primary font-black text-xl">$1,850</span>
              </div>

              <div className="flex justify-between items-start group">
                <div className="flex-1">
                  <h5 className="text-lg font-bold text-white group-hover:text-primary transition-colors uppercase tracking-wider">
                    Clase Azul Ultra
                  </h5>
                  <p className="text-slate-400 text-sm italic">
                    Extra Añejo Tequila, Hand-crafted Ceramic Decanter
                  </p>
                </div>
                <span className="text-primary font-black text-xl">$4,200</span>
              </div>

              <div className="flex justify-between items-start group">
                <div className="flex-1">
                  <h5 className="text-lg font-bold text-white group-hover:text-primary transition-colors uppercase tracking-wider">
                    Dom Pérignon P2
                  </h5>
                  <p className="text-slate-400 text-sm italic">
                    Vintage 2004, Plénitude 2, Magnum (1.5L)
                  </p>
                </div>
                <span className="text-primary font-black text-xl">$2,900</span>
              </div>

            </div>
          </div>

        </div>

        <div className="mt-16 text-center">
          <button className="border border-primary text-primary px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
            Descargar Menu Completo
          </button>
        </div>

      </div>
    </section>
  )
}
