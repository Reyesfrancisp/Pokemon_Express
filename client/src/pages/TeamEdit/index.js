import { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import getPokemonInfo from "./TeamQuery";
import PokemonCard from "../../components/PokemonOutput";
import TeamDisplay from "../../components/TeamDisplay";
import LoadingSpinner from "../../components/Loading";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


function TeamEdit(props) {

    const { setUserState, stateTracker, setStateTracker } = props;
    const { teamID } = stateTracker;
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [info, setInfo] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getRandomNumber = () => Math.floor(Math.random() * 1008) + 1;
                const randomNum = getRandomNumber();
                const pokemonData = await getPokemonInfo(randomNum);
                await setInfo(pokemonData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokemon info:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Only include randomNum and getPokemonInfo

    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate('/teams');
    };

    const [teamData, setTeamData] = useState({
        name: "Example"
    });

    useEffect(() => {
        if (!teamID) { return }
        const fetchTeamData = async () => {
            try {
                const response = await axios.get(`/team/${teamID}`);
                console.log(response.data);
                setTeamData(response.data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching team data:', error);
                setLoading(false)
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

    if (!teamID) {
        return <Navigate to="/teams" replace />;
    }

    if (loading || !info) {
        return <LoadingSpinner />; // You can show a loading modal here
    }

    return (
        <div className="flex-col md:flex my-4">

           
            <button
                className="bg-white hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md shadow-md w-28"
                style={{ marginLeft: 'calc(25% - 8px)', marginTop: '20px' }}
                onClick={handleBackButtonClick}
            >
                Back
            </button>


            <h3 className="text-white text-3xl text-center font-extrabold font-weight p-2 my-6">Edit Your Team</h3>
            <div className="flex flex-col items-center">
                <TeamDisplay teamData={teamData} setTeamData={setTeamData} stateTracker={stateTracker} setStateTracker={setStateTracker} />

                <button
                    className="bg-blue-500 text-white px-4 py-2 my-2 rounded-md"
                    onClick={() => addPokemonToTeam(teamID, info.pokemonName)}
                >
                    Add Pokemon to Team
                </button>
                <div className="flex justify-center items-center space-x-10 mt-4">

                    <button
                        className="py-2 px-4 text-white bg-black"
                        onClick={previousPokemon}
                    >
                        <FaArrowLeft />
                    </button>
                    <div className="text-center">
                        <PokemonCard info={info} />
                    </div>
                    <button
                        className="py-2 px-4 text-white bg-black "
                        onClick={nextPokemon}
                    >
                        <FaArrowRight />
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