import React, { useState } from "react";

const Profile = () => {

  const [showPassword, setShowPassword] = useState(false);

  const eventsHistory = [
    { id: 1, name: "Techno Overload", date: "Mar 22", rating: 5 },
    { id: 2, name: "Neon Rave", date: "Feb 15", rating: 4 },
  ];

  const reviews = [
    {
      id: 1,
      event: "Cyber Bass",
      comment: "Amazing energy and music!",
    },
  ];

  return (
  <div className="flex-1 overflow-y-auto p-8 text-white bg-black min-h-screen">

    {/* HEADER */}

    <header className="mb-10">
      <h2 className="font-orbitron text-4xl font-black">
        PROFILE
      </h2>

      <p className="text-gray-400 mt-2">
        Manage your nightclub identity
      </p>
    </header>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT PANEL */}

        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 text-center">

          {/* AVATAR */}

          <div className="relative mx-auto w-fit">

            <img
              src="https://i.pravatar.cc/200"
              className="w-32 h-32 rounded-full border-4 border-neon-purple shadow-[0_0_25px_#bf00ff]"
            />

            <label className="absolute bottom-0 right-0 cursor-pointer bg-neon-purple text-black px-3 py-1 text-xs rounded-full font-bold hover:bg-pink-500">
              Upload
              <input type="file" className="hidden" />
            </label>

          </div>

          <h3 className="mt-6 text-xl font-bold">
            Alex Rivera
          </h3>

          <p className="text-gray-400 text-sm">
            VIP Member
          </p>

          {/* STATS */}

          <div className="mt-6 space-y-3">

            <div className="bg-black border border-white/10 rounded-xl p-4">
              <p className="text-xs text-gray-400">
                Events Attended
              </p>

              <p className="font-bold text-neon-purple">
                18
              </p>
            </div>

            <div className="bg-black border border-white/10 rounded-xl p-4">
              <p className="text-xs text-gray-400">
                Reviews Written
              </p>

              <p className="font-bold text-neon-purple">
                7
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="lg:col-span-2 space-y-8">

          {/* ACCOUNT SETTINGS */}

          <div className="bg-[#111] border border-white/10 rounded-2xl p-8">

            <h3 className="font-orbitron text-xl mb-6">
              Account Settings
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="text-sm text-gray-400">
                  Full Name
                </label>

                <input
                  type="text"
                  defaultValue="Alex Rivera"
                  className="w-full mt-2 bg-black border border-white/20 rounded-xl p-3 focus:border-neon-purple focus:shadow-[0_0_10px_#bf00ff] outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Email
                </label>

                <input
                  type="email"
                  defaultValue="alex@email.com"
                  className="w-full mt-2 bg-black border border-white/20 rounded-xl p-3 focus:border-neon-purple focus:shadow-[0_0_10px_#bf00ff] outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Phone
                </label>

                <input
                  type="text"
                  defaultValue="+57 300000000"
                  className="w-full mt-2 bg-black border border-white/20 rounded-xl p-3 focus:border-neon-purple focus:shadow-[0_0_10px_#bf00ff] outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  City
                </label>

                <input
                  type="text"
                  defaultValue="Bogotá"
                  className="w-full mt-2 bg-black border border-white/20 rounded-xl p-3 focus:border-neon-purple focus:shadow-[0_0_10px_#bf00ff] outline-none"
                />
              </div>

            </div>

          </div>

          {/* PASSWORD */}

          <div className="bg-[#111] border border-white/10 rounded-2xl p-8">

            <h3 className="font-orbitron text-xl mb-6">
              Security
            </h3>

            <div className="space-y-4">

              <input
                type="password"
                placeholder="Current password"
                className="w-full bg-black border border-white/20 rounded-xl p-3 focus:border-neon-purple outline-none"
              />

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  className="w-full bg-black border border-white/20 rounded-xl p-3 pr-12 focus:border-neon-purple outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-neon-purple"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

          </div>

          {/* EVENT HISTORY */}

          <div className="bg-[#111] border border-white/10 rounded-2xl p-8">

            <h3 className="font-orbitron text-xl mb-6">
              Event History
            </h3>

            <div className="space-y-4">

              {eventsHistory.map((event) => (

                <div
                  key={event.id}
                  className="flex justify-between items-center bg-black border border-white/10 rounded-xl p-4 hover:border-neon-purple transition"
                >

                  <div>

                    <h4 className="font-bold">
                      {event.name}
                    </h4>

                    <p className="text-gray-400 text-xs">
                      {event.date}
                    </p>

                  </div>

                  <div className="text-yellow-400">
                    {"⭐".repeat(event.rating)}
                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* REVIEWS */}

          <div className="bg-[#111] border border-white/10 rounded-2xl p-8">

            <h3 className="font-orbitron text-xl mb-6">
              My Reviews
            </h3>

            <div className="space-y-4">

              {reviews.map((review) => (

                <div
                  key={review.id}
                  className="bg-black border border-white/10 rounded-xl p-4 hover:border-neon-purple transition"
                >

                  <h4 className="font-bold text-neon-purple">
                    {review.event}
                  </h4>

                  <p className="text-gray-400 text-sm mt-1">
                    {review.comment}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* SAVE */}

          <div className="flex justify-end">

            <button className="px-8 py-3 bg-neon-purple text-black font-bold rounded-xl hover:bg-pink-500 transition shadow-[0_0_20px_#bf00ff]">
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;