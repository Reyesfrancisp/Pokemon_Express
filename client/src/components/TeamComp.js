import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function TeamComp(props) {
  const { teamData, setUserState, stateTracker, setStateTracker } = props;
  const navigate = useNavigate();
  console.log("This is the team data: ", teamData);

  const handleEditClick = () => {
    setStateTracker({ ...stateTracker, teamID: teamData._id });
    navigate('/team-edit');
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`/team/${teamData._id}`);
      // Call the function to fetch user data again to trigger re-render
      fetchData();
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    // Fetch the Pokémon data based on the references in teamData
    const fetchPokemonData = async () => {
      try {
        const pokemonRefs = [
          teamData.pokemon1,
          teamData.pokemon2,
          teamData.pokemon3,
          teamData.pokemon4,
          teamData.pokemon5,
          teamData.pokemon6,
        ].filter(pokemonRef => pokemonRef !== null);

        const response = await axios.post('/fetch-pokemon', { pokemonIDs: pokemonRefs });
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, [teamData]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/user'); // Fetch updated user data
      const newUserState = response.data.user;
      setUserState(newUserState);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto border p-4 rounded shadow mb-4">
    <h2 className="text-xl font-semibold mb-4">{teamData.name}</h2>
    
    {/* Display up to 6 Pokémon */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pokemonData.map((pokemon, index) => (
        <div key={index} className="border p-2 rounded shadow">
          <h3 className="text-lg font-medium">{pokemon.name}</h3>
          {/* Display other details if needed */}
        </div>
      ))}
    </div>
  
    <div className="flex justify-end mt-4 space-x-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleEditClick}
      >
        Edit
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </div>
  </div>
  

  );
}

export default TeamComp;
