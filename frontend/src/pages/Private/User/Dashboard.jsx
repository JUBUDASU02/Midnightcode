import React from "react";

const events = [
  {
    id: 1,
    name: "Techno Overload",
    dj: "DJ Jubu",
    date: "March 22",
    price: "$100.000",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
  {
    id: 2,
    name: "Techno Overload",
    dj: "DJ Jubu",
    date: "March 22",
    price: "$100.000",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
  {
    id: 3,
    name: "Techno Overload",
    dj: "DJ Jubu",
    date: "March 22",
    price: "$100.000",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
  {
    id: 4,
    name: "Techno Overload",
    dj: "DJ Jubu",
    date: "March 22",
    price: "$100.000",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
  {
    id: 5,
    name: "Techno Overload",
    dj: "DJ Jubu",
    date: "March 22",
    price: "$100.000",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
  {
    id: 6,
    name: "Techno Overload",
    dj: "DJ Jubu",
    date: "March 22",
    price: "$100.000",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
  {
    id: 7,
    name: "Neon Night",
    dj: "DJ Jesu",
    date: "March 28",
    price: "$150.000",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063",
  },
  {
    id: 8,
    name: "Cyber Rave",
    dj: "DJ Jubu & DJ Jesu",
    date: "April 5",
    price: "$50.000",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
  },
];

const reservations = [
  {
    id: 1,
    event: "Techno Overload",
    date: "March 22",
    type: "VIP",
    status: "Confirmed",
  },
];

const UserDashboard = () => {
  return (
    <div className="flex h-screen bg-black w-full overflow-hidden">

      {/* SIDEBAR */}

      <aside className="w-24 lg:w-64 bg-deep-charcoal border-r border-gray-800 flex flex-col items-center lg:items-start py-8">

        <div className="px-6 mb-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-neon-purple rounded-lg flex items-center justify-center shadow-neon-glow">
            <span className="font-orbitron font-black text-black text-xl">
              N
            </span>
          </div>

          <h1 className="hidden lg:block font-orbitron font-black text-xl text-white">
            <span className="text-neon-purple">NEON</span> OVERLOAD
          </h1>
        </div>

        <nav className="flex-1 w-full px-4 space-y-4">

          <a className="flex items-center gap-4 p-3 rounded-xl text-neon-purple bg-neon-purple/20 border-l-4 border-neon-purple">
            Dashboard
          </a>

          <a className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5"  href="#events">
            Events
          </a>

          <a className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5" href="#reservations">
            My Reservations
          </a>

          <a className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5" href="#reviews">
            Reviews
          </a>

          <a className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5" href="./profile">
            Profile
          </a>
        </nav>

        <div className="p-6 border-t border-gray-800 w-full">
          <p className="text-white text-sm font-bold">User</p>
          <p className="text-xs text-neon-magenta uppercase">Guest</p>
        </div>

      </aside>

      {/* MAIN */}

      <main className="flex-1 overflow-y-auto p-8">

        {/* HEADER */}

        <header className="flex justify-between items-end mb-10">

          <div>
            <h2 className="font-orbitron font-black text-4xl text-white uppercase">
              Dashboard
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Welcome back
            </p>
          </div>

        </header>

        {/* FEATURED EVENT */}

        <section className="glass-panel rounded-3xl p-8 border border-neon-purple/20 mb-10 relative overflow-hidden">

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-orbitron text-2xl text-white font-black">
                NEXT EVENT
              </h3>

              <p className="text-gray-400 mt-2">
                Techno Overload — March 22
              </p>

              <button className="mt-4 px-6 py-3 bg-neon-purple text-black rounded-xl font-bold hover:bg-neon-magenta transition">
                Reserve Spot
              </button>

            </div>

            <div className="text-neon-purple font-orbitron text-5xl font-black">
              22
            </div>

          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 blur-[120px]"></div>

        </section>

        {/* EVENTS */}

        <section className="mb-12" id="events">

          <h3 className="font-orbitron text-xl text-white mb-6 uppercase">
            Upcoming Events
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {events.map((event) => (
              <div
                key={event.id}
                className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-neon-purple transition"
              >

                <img
                  src={event.image}
                  className="rounded-xl mb-4 h-40 w-full object-cover"
                />

                <h4 className="text-white font-bold">
                  {event.name}
                </h4>

                <p className="text-gray-400 text-sm">
                  {event.dj}
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  {event.date}
                </p>

                <div className="flex justify-between items-center mt-4">

                  <span className="text-neon-purple font-bold">
                    {event.price}
                  </span>

                  <button className="px-4 py-2 bg-neon-purple text-black rounded-lg font-bold hover:bg-neon-magenta transition">
                    Reserve
                  </button>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* MY RESERVATIONS */}

        <section className="mb-12" id ="reservations">

          <h3 className="font-orbitron text-xl text-white mb-6 uppercase">
            My Reservations
          </h3>

          <div className="space-y-4">

            {reservations.map((res) => (
              <div
                key={res.id}
                className="glass-panel p-4 rounded-xl border border-white/10 flex justify-between items-center"
              >

                <div>

                  <h4 className="text-white font-bold">
                    {res.event}
                  </h4>

                  <p className="text-gray-400 text-xs">
                    {res.date} • {res.type}
                  </p>

                </div>

                <span className="text-neon-purple font-bold">
                  {res.status}
                </span>

              </div>
            ))}

          </div>

        </section>

        {/* REVIEWS */}

        <section className="glass-panel p-6 rounded-3xl border border-white/10" id="reviews">

          <h3 className="font-orbitron text-xl text-white mb-4 uppercase">
            Leave a Review
          </h3>

          <textarea
            placeholder="How was the event?"
            className="w-full bg-black border border-white/20 rounded-xl p-4 text-white focus:border-neon-purple outline-none"
          />

          <button className="mt-4 px-6 py-3 bg-neon-magenta text-black rounded-xl font-bold hover:bg-neon-purple transition">
            Submit Review
          </button>

        </section>

      </main>

    </div>
  );
};

export default UserDashboard;