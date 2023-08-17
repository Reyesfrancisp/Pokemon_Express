import { useState } from "react";
import getPokemonInfo from "./pokeApiQuery";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import PokemonCard from "../../components/PokemonOutput";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [info, setInfo] = useState({
    formattedID: "025",
    pokemonName: "Pikachu",
    pokemonID: "25",
    pokemonHeight: "1'00\"",
    pokemonWeight: 60,
    type1: "Electric",
    type2: "",
  });

  const handleSearch = async () => {
    try {
      const pokemonInfo = await getPokemonInfo(searchQuery);
      setInfo(pokemonInfo); // Update the info state with fetched data
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const nextPokemon = async () => {
    try {
      const currentID = Number(info.pokemonID);
      const nextID = currentID + 1;
      setSearchQuery(nextID.toString());
      const pokemonInfo = await getPokemonInfo(nextID);
      setInfo(pokemonInfo);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const previousPokemon = async () => {
    try {
      const currentID = Number(info.pokemonID);
      const prevID = currentID - 1;
      setSearchQuery(prevID.toString());
      const pokemonInfo = await getPokemonInfo(prevID);
      setInfo(pokemonInfo);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  //Use the key enter to search the pokemon
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex-col md:flex h-screen mb-40 mt-10">
      <h1 className="text-3xl text-center font-extrabold text-white mb-4">Search Page</h1>
      <div className="flex flex-col items-center">
        <input
          className="px-4 py-2  border border-gray-300"
          type="text"
          placeholder="Search Pokemon"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="px-4 py-2 mt-4 bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>

        <div className="flex justify-center items-center space-x-10 mt-4">
          <button
            className="py-2 px-4 text-white bg-black"
            onClick={previousPokemon}
          >
            <FaArrowLeft /> 
          </button>

          <PokemonCard info={info} />

          <button
            className="py-2 px-4 text-white bg-black "
            onClick={nextPokemon}
          >
            <FaArrowRight /> 
          </button>
        </div>
      </div>
    </div>
  );
}


export default Search;
