import { useState } from "react";
import getPokemonInfo from "./pokeApiQuery";
import PokemonCard from "../../components/pokemonCard";

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

        <div className="flex justify-center items-center space-x-10">
          <button className="py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 w-[150px]">
            Previous
          </button>
          <PokemonCard info={info} />
          <button className="py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 w-[150px]">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
