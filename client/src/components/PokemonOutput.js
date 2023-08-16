import React from 'react';

function PokemonCard({ info }) {
  return (
    <div className="flex justify-center bg-white my-5">
      <div className="relative max-w-md bg-gray-200 rounded-lg overflow-hidden shadow-md ">
        <div className="absolute z-0 top-2 left-2 w-full h-full bg-gradient-to-r from-slate-600 to-white rotate-6"></div>
        <div className="absolute z-0 top-2 right-2 w-full h-full bg-gradient-to-br from-teal-600 to-white rotate-6"></div>
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${info.formattedID}.png`}
          alt="Pokemon from the search bar"
          className="w-3/4 h-auto mx-auto relative z-10"
        />
        <div className="p-4 relative z-10 bg-gray-200">
          <h2 className="capitalize text-xl font-semibold mb-2">{info.pokemonName}</h2>
          <p>Pokemon ID: {info.pokemonID}</p>
          <p>Pokemon Height: {info.pokemonHeight}</p>
          <p>Pokemon Weight: {info.pokemonWeight} lbs</p>
          <p className="capitalize">Type 1: {info.type1}</p>
          {info.type2 && <p className="capitalize">Type 2: {info.type2}</p>}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
