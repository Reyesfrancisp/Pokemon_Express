import  { useState, useEffect } from 'react';
import axios from 'axios';

function TeamDisplay({ teamData, setTeamData }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [editedTeamName, setEditedTeamName] = useState("");

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

        const response = await axios.get(`/fetch-pokemon/${pokemonRefs.join(',')}`); // Adjust the endpoint to your API
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, [teamData]);

  const handleTeamNameChange = (event) => {
    setEditedTeamName(event.target.value);
  };

  const handleSaveTeamName = async () => {
    try {
      if (editedTeamName === '') {
        // Handle empty team name
        return;
      }
      
      const updatedTeam = {
        ...teamData,
        name: editedTeamName
      };
      
      const response = await axios.put(`/team/${teamData._id}`, updatedTeam);
      console.log('Team name updated:', response.data);
      
      // Update teamData using setTeamData
      setTeamData(response.data);
    } catch (error) {
      console.error('Error updating team name:', error);
    }
  };

  return (
    <div className="border p-4 rounded shadow mb-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          className="text-xl font-semibold mb-2 focus:outline-none border-b-2 border-blue-500"
          placeholder={teamData.name}
          value={editedTeamName}
          onChange={handleTeamNameChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSaveTeamName}
        >
          Save
        </button>
      </div>

      {/* Display up to 6 Pokémon */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemonData.map((pokemon, index) => (
          <div key={index} className="border p-2 rounded shadow">
            <h3 className="text-lg font-medium">{pokemon.name}</h3>
            {/* Display other details if needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamDisplay;
