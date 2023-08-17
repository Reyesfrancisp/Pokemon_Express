import React from 'react';

function PokemonCard({ info }) {
  return (
    <div className="flex justify-center my-5 relative">
      <div className="relative max-w-md bg-gray-500 rounded-lg overflow-hidden shadow-xl  inset-0 border-8 border-sky-300">
        <div className="absolute z-0 top-2 left-2 w-full h-full bg-gradient-to-r from-slate-600 to-white rotate-6"></div>
        <div className="absolute z-0 top-32 right-4 w-full h-full bg-gradient-to-r from-teal-600 to-white rotate-6"></div>
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${info.formattedID}.png`}
          alt="Pokemon from the search bar"
          className="w-3/4 h-auto mx-auto relative z-10"
        />
        <div className="p-4 relative z-10 bg-gray-300 shadow-md">
          <h3 className="capitalize text-2xl font-semibold mb-2">{info.pokemonName}</h3>
          <p className="text-gray-600 text-lg">Pokemon ID: {info.pokemonID}</p>
          <p className="text-gray-600 text-lg">Height: {info.pokemonHeight}</p>
          <p className="text-gray-600 text-lg">Weight: {info.pokemonWeight} lbs</p>
          <p className="text-gray-600 capitalize text-lg">Type 1: {info.type1}</p>
          {info.type2 && <p className="text-gray-600 capitalize text-lg">Type 2: {info.type2}</p>}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
