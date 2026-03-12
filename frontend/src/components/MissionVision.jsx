function MissionVision() {
  return (
    <section className="px-4 py-20">

      <h2 className="text-3xl font-bold text-center text-white">
        Nuestra Misión y Visión
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <div className="bg-gray-900 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white">Nuestra Misión</h3>
          <p className="text-gray-400 mt-2">
            Empoderar a nuestros clientes con herramientas tecnológicas
            intuitivas y poderosas.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white">Nuestra Visión</h3>
          <p className="text-gray-400 mt-2">
            Ser líderes en innovación y crear tecnología accesible
            para todas las industrias.
          </p>
        </div>

      </div>
    </section>
  );
}

export default MissionVision;
