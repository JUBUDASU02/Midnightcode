function Hero() {
  return (
    <section className="px-4 py-20 flex flex-col lg:flex-row items-center gap-10">
      
      <div className="lg:w-1/2">
        <h1 className="text-5xl font-black text-white">
          Innovación y Elegancia Para Tu Futuro Digital
        </h1>

        <p className="text-gray-400 mt-4">
          Descubre una plataforma diseñada para simplificar procesos
          complejos y potenciar tu productividad.
        </p>

        <button className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-full font-bold">
          Comenzar Ahora
        </button>
      </div>

      <div className="lg:w-1/2">
        <img src="/src/assets/hero.png" className="rounded-xl" />
      </div>

    </section>
  );
}

export default Hero;