import { useState, useEffect } from "react";
import axios from 'axios'; // Import axios for API requests
import getPokemonInfo from "./TeamQuery";
import PokemonCard from "../../components/PokemonCard";
import TeamDisplay from "../../components/TeamDisplay";

function TeamEdit(props) {

    const { userState, setUserState, stateTracker, setStateTracker } = props;
    const {teamID} = stateTracker;

    const [searchQuery, setSearchQuery] = useState("");
    const [info, setInfo] = useState({
        formattedID: "151",
        pokemonName: "mew",
        pokemonID: "151",
        pokemonHeight: "1'4\"",
        pokemonWeight: "8.81",
        type1: "Psychic",
        type2: "",
    });

    
        const [teamData, setTeamData] = useState({
            name: "Example"
        });
      
        useEffect(() => {
            console.log("using effect on teamedit");
          const fetchTeamData = async () => {
            try {
              const response = await axios.get(`/team/${teamID}`);
              console.log(response.data);
              setTeamData(response.data); // Assuming the response contains the team data
            } catch (error) {
              console.error('Error fetching team data:', error);
            }
          };
      
          fetchTeamData();
        }, [teamID]);

    const addPokemonToTeam = async (teamID, name) => {
        try {
            // Make an API call to add a Pokemon to the team with the specified ID
            // Adjust the endpoint and payload as needed
            const response = await axios.post(`/team/${teamID}/pokemon`, { pokemonName: name });
            const newUserState = response.data.user;
            setUserState(newUserState);
            const teamResponse = await axios.get(`/team/${teamID}`);
            console.log("The team response data is: ", teamResponse.data);
            setTeamData(teamResponse.data);
            
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
            <h1 className="text-3xl text-center font-semibold mb-4">Team Page</h1>
            <div className="flex flex-col items-center">
            <TeamDisplay teamData= {teamData}    />           

                <button
                    className="bg-blue-500 text-white px-4 py-2 my-8 rounded-md"
                    onClick={() => addPokemonToTeam(teamID, info.pokemonName)}
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
            </div>
        </div>
    );
}

export default TeamEdit;