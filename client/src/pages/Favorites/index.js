import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../../components/pokemonCard";
import Search from "../Search"; // Adjust the path accordingly

function Favorites({ userState, setUserState }) {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("/favorite");
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="flex-col md:flex">
      <h1 className="text-3xl text-center font-semibold mb-4">Favorites Page</h1>
      <Search userState={userState} fetchFavorites={fetchFavorites} setUserState={setUserState} />
      {/* Render the list of favorite Pokémon */}
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center space-x-4 space-y-4">
          {favorites.map((favorite) => (
            <PokemonCard key={favorite._id} info={{ pokemonName: favorite.name }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
