import React from 'react';
import bug from "../images/types/bug.png";
import dark from "../images/types/dark.png";
import dragon from "../images/types/dragon.png";
import electric from "../images/types/electric.png";
import fairy from "../images/types/fairy.png";
import fighting from "../images/types/fighting.png";
import fire from "../images/types/fire.png";
import flying from "../images/types/flying.png";
import ghost from "../images/types/ghost.png";
import grass from "../images/types/grass.png";
import ground from "../images/types/ground.png";
import ice from "../images/types/ice.png";
import normal from "../images/types/normal.png";
import poison from "../images/types/poison.png";
import psychic from "../images/types/psychic.png";
import rock from "../images/types/rock.png";
import steel from "../images/types/steel.png";
import water from "../images/types/water.png";



function PokemonCard({ info }) {
  const typeImages = {
    bug,
    dark,
    dragon,
    electric,
    fairy,
    fighting,
    fire,
    flying,
    ghost,
    grass,
    ground,
    ice,
    normal,
    poison,
    psychic,
    rock,
    steel,
    water,
  };


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
        <div className="p-4 relative z-10 text-center bg-gray-300 shadow-md">
          <h3 className="capitalize text-2xl font-semibold mb-2">{info.pokemonName}</h3>
          <p className="text-gray-600 text-lg">Pokemon ID: {info.pokemonID}</p>
          <p className="text-gray-600 text-lg">Height: {info.pokemonHeight}</p>
          <p className="text-gray-600 text-lg">Weight: {info.pokemonWeight} lbs</p>

          <p className="text-gray-600 capitalize flex-row text-lg flex items-center justify-center">
            Type 1: {info.type1}
            <div className="inline-block ml-4">
              <img
                src={typeImages[info.type1]} // Assuming move.type is the type name
                alt={`${info.type1} type`}
                className="w-6 h-6"
              />
            </div>
          </p>



          {info.type2 &&
         <p className="text-gray-600 capitalize flex-row text-lg flex items-center justify-center">
         Type 2: {info.type2}
         <div className="inline-block ml-4">
           <img
             src={typeImages[info.type2]} // Assuming move.type is the type name
             alt={`${info.type2} type`}
             className="w-6 h-6"
           />
         </div>
       </p>
       

          }

        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
