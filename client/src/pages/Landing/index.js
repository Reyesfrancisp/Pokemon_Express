import React from 'react';

function Landing() {
  return (
    <main className="landing bg-cover bg-center  h-screen flex items-center">
      <div className="mx-auto text-center">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
          Welcome to the PokeDex Express
        </h1>
        <p className="text-lg md:text-xl text-white mb-8">
          Catch 'em all and explore the world of Pokémon!
        </p>
        <a href="/search" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg md:text-xl hover:bg-blue-500 transition duration-300 ease-in-out">
          Explore Now
        </a>
      </div>
    </main>
  );
}

export default Landing;
