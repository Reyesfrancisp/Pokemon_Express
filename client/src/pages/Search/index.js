import { useState } from "react";
import getPokemonInfo from "./pokeApiQuery";
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

  return (
    <div className="flex-col md:flex">
      <h1 className="text-3xl text-center font-semibold mb-4">Search Page</h1>
      <div className="flex flex-col items-center">
        <input
          className="px-4 py-2  border border-gray-300"
          type="text"
          placeholder="Search Pokemon"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 mt-4 bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>

        <div className="flex justify-center items-center space-x-10 mt-4">

          <button
            className="flex items-center justify-center py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 w-[140px] border-2 border-blue-600 rounded-lg transition duration-300"
            onClick={previousPokemon}
          >
            <svg
              className="w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                fill="currentColor"
              />
            </svg>

            <p className="mx-2">Previous</p>
          </button>


          <PokemonCard info={info} />


          <button
            className="flex items-center justify-center py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 w-[140px] border-2 border-blue-600 rounded-lg transition duration-300"
            onClick={nextPokemon}
          >
            <p className="mx-2">Next</p>
            <svg
              className="h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path
                d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                fill="currentColor"
              />
            </svg>
          </button>

        </div>
      </div>
    </div>
  );
}


export default Search;
