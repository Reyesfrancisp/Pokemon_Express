import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function TeamDisplay(props) {
    const { teamData, setTeamData, stateTracker, setStateTracker } = props;
    const navigate = useNavigate();
    const [pokemonData, setPokemonData] = useState([]);
    const [editedTeamName, setEditedTeamName] = useState("");

    console.log("This is the team data on the TeamDisplay.js page: ", teamData)
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


    console.log("This is the pokemon data: ", pokemonData);

    const handleTeamNameChange = (event) => {
        setEditedTeamName(event.target.value);
    };

    const handleEditPokemon = (pokemonID) => {
        // Set  state using the state setter function here

        console.log("This is the pokemon ID: ", pokemonID);

        setStateTracker({ ...stateTracker, pokemonID });

        console.log("This is the state tracker: ", stateTracker);
        // Then navigate to the pokemon-edit page
        navigate(`/pokemon-edit`);
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

    const handleDeletePokemon = async (pokemonID) => {
        try {
            // Create an object with team ID and pokemon ID
            const deleteData = {
                teamID: teamData._id,
                pokemonID: pokemonID
            };

            // Perform the delete operation using the object in the request body
            const response = await axios.delete('/delete-pokemon', { data: deleteData });
            console.log('Pokemon deleted:', response.data);

            // Update the displayed list of pokemonData by filtering out the deleted Pokemon
            setPokemonData(prevData => prevData.filter(pokemon => pokemon._id !== pokemonID));
        } catch (error) {
            console.error('Error deleting Pokemon:', error);
        }
    };



    return (
        <div className="bg-indigo-400 border p-4 rounded shadow mb-4">
            <div className=" flex justify-between items-center">
                <input
                    type="text"
                    className="text-xl font-semibold p-4 m-4 focus:outline-none border-b-2 border-blue-500 w-2/3 pr-2"
                    placeholder={teamData.name}
                    value={editedTeamName}
                    onChange={handleTeamNameChange}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 mr-4 rounded hover:bg-blue-600 transition duration-300"
                    onClick={handleSaveTeamName}
                >
                    Save
                </button>
            </div>
     


            {/* Display up to 6 Pokémon */ }
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
        {pokemonData.map((pokemon, index) => (
            <div key={index} className="border p-6 m-4 rounded shadow bg-green-500">
                <h3 className="capitalize text-lg font-medium">{pokemon.name}</h3>
                {/* Display other details if needed */}
                <div className="flex mt-4 justify-between">
                    <button
                        className="bg-yellow-500 text-white text-sm px-4 py-2 justify-start rounded mr-2"
                        onClick={() => handleEditPokemon(pokemon._id)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 text-white text-sm px-4 py-2 rounded"
                        onClick={() => handleDeletePokemon(pokemon._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        ))}
    </div>

        </div >
    );
}

export default TeamDisplay;
