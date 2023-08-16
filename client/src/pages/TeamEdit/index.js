import { useState } from "react";
import axios from 'axios'; // Import axios for API requests
import getPokemonInfo from "./TeamQuery";
import PokemonCard from "../../components/pokemonCard";

function TeamEdit({ userState, setUserState }) {
    const {teamID} = userState;
  const [searchQuery, setSearchQuery] = useState("");
  const [info, setInfo] = useState({
    formattedID: "151",
    pokemonName: "Mew",
    pokemonID: "151",
    pokemonHeight: "1'4\"",
    pokemonWeight: "8.81",
    type1: "Psychic",
    type2: "",
  });

  const addPokemonToTeam = async (teamId, pokeId) => {
    try {
      // Make an API call to add a Pokemon to the team with the specified ID
      // Adjust the endpoint and payload as needed
      const response = await axios.post(`/team/${teamId}/pokemon`, { pokemonId: pokeId });
      const newUserState = response.data.user;
      setUserState(newUserState);
    } catch (error) {
      console.error('Error adding a Pokemon:', error);
    }
  };

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
      
            <button
              className="bg-blue-500 text-white px-4 py-2 my-8 rounded-md"
              onClick={() => addPokemonToTeam(teamID, info.pokemonID)}
            >
              Add Pokemon to Team
            </button>
        <div className="flex justify-center items-center space-x-10 mt-4">
          <button
            className="py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 w-[150px]"
            onClick={previousPokemon}
          >
            Previous
          </button>
          <PokemonCard info={info} />
          <button
            className="py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 w-[150px]"
            onClick={nextPokemon}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamEdit;