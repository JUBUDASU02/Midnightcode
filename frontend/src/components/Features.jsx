function Features() {
  return (
    <section className="px-4 py-20 text-center">

      <h2 className="text-3xl font-bold text-white">
        ¿Por qué elegirnos?
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-gray-900 p-6 rounded-xl">
          <span className="material-symbols-outlined text-yellow-500 text-3xl">
            bolt
          </span>
          <h3 className="text-white font-bold mt-2">
            Rendimiento Superior
          </h3>
          <p className="text-gray-400 text-sm">
            Velocidad y fiabilidad sin igual.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <span className="material-symbols-outlined text-yellow-500 text-3xl">
            design_services
          </span>
          <h3 className="text-white font-bold mt-2">
            Diseño Intuitivo
          </h3>
          <p className="text-gray-400 text-sm">
            Interfaz simple y fácil de usar.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <span className="material-symbols-outlined text-yellow-500 text-3xl">
            security
          </span>
          <h3 className="text-white font-bold mt-2">
            Seguridad Robusta
          </h3>
          <p className="text-gray-400 text-sm">
            Protección con los más altos estándares.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Features;