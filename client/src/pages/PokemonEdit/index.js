
import { useState, useEffect } from 'react';
import axios from 'axios';
import MoveInfo from "../../components/MoveInfo";
import LoadingSpinner from "../../components/Loading";
import getPokemonMoves from "./movesApiQuery";
import { Navigate, useNavigate } from 'react-router-dom';

import bug from "../../images/types/bug.png";
import dark from "../../images/types/dark.png";
import dragon from "../../images/types/dragon.png";
import electric from "../../images/types/electric.png";
import fairy from "../../images/types/fairy.png";
import fighting from "../../images/types/fighting.png";
import fire from "../../images/types/fire.png";
import flying from "../../images/types/flying.png";
import ghost from "../../images/types/ghost.png";
import grass from "../../images/types/grass.png";
import ground from "../../images/types/ground.png";
import ice from "../../images/types/ice.png";
import normal from "../../images/types/normal.png";
import poison from "../../images/types/poison.png";
import psychic from "../../images/types/psychic.png";
import rock from "../../images/types/rock.png";
import steel from "../../images/types/steel.png";
import water from "../../images/types/water.png";

function PokemonEdit(props) {

  const typeImages = {
    bug,
    dark,
    dragon,
    electric,
    fairy,
    fighting,
    fire,
    flying,
    ghost,
    grass,
    ground,
    ice,
    normal,
    poison,
    psychic,
    rock,
    steel,
    water,
  };


  const { userState, setUserState, stateTracker, setStateTracker } = props;

  console.log("State tracker in pokemon edit page: ", stateTracker);
  const { pokemonID, moveID } = stateTracker;
  console.log("Pokemon id on edit page is: ", pokemonID);
  const [pokemonName, setPokemonName] = useState({ name: "" });
  const { name } = pokemonName;
  const [moves, setMoves] = useState([]);

  const [pokemonMoves, setPokemonMoves] = useState();

  // let moveData = moves;

  console.log("The pokemon name on the pokemon-edit page is: ", name);

  useEffect(() => {
    if (!pokemonID) { return }
    const fetchMoves = async () => {
      try {
        const response = await axios.post('/getPokemonMoves', { pokemonID });
        const pokeMovesData = response.data; // Assuming the response contains the moves data
        console.log("Pokemon Moves Data after the fetch: ", pokeMovesData);
        setPokemonMoves(pokeMovesData);
      } catch (error) {
        console.error('Error fetching moves:', error);
      }
    };

    fetchMoves();
  }, [pokemonID, moveID]);

  useEffect(() => {
    if (!pokemonID) { return }
    axios.post('/getPokemonName', { pokemonID })
      .then(async response => {


        console.log("This is the response data: ", response.data);
        const responseName = response.data.pokemonName;
        console.log("output response data name: ", responseName);


        setPokemonName({ name: responseName });

        const movesData = await getPokemonMoves(responseName);
        //setMoves(movesData);
        console.log("These are the moves", movesData);
        setMoves(movesData);

      })
      .catch(error => {
        console.error('Error fetching Pokémon name:', error);
      });
  }, [pokemonID]);


  const deleteMove = async (move) => {
    try {
      const response = await axios.post('/deleteMove', {
        pokemonID: pokemonID,
        name: move.name
      });

      if (response.status === 200) {
        // Remove the deleted move from the state
        setPokemonMoves(prevMoves => ({
          moves: prevMoves.moves.filter(m => m !== move)
        }));
        console.log('Move deleted successfully');
      } else {
        console.error('Failed to delete move');
      }
    } catch (error) {
      console.error('Error deleting move:', error);
    }
  };
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate('/team-edit');
};



  if (!pokemonID) {
    return <Navigate to="/teams" replace />;
  }

  // Only render the component when moves data is available
  if (moves.length === 0) {
    return (
      <LoadingSpinner />
    );
  }

  else {
    console.log("Move data to be passed: ", moves);
    console.log("first move name: ", moves[0].pokemon_v2_move.name);
    console.log("first move type: ", moves[0].pokemon_v2_move.pokemon_v2_type.name);
    console.log("first move description: ", moves[0].pokemon_v2_move.pokemon_v2_moveflavortexts[0].flavor_text);

    console.log("Pokemon moves of the current pokemon are: ", pokemonMoves);
    return (
      <div className="text-center p-8 rounded-md shadow-md flex flex-col">
        <button
          className="bg-white hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 my-4 rounded-md shadow-md w-28"
          style={{ marginLeft: 'calc(25% - 8px)', marginTop: '20px' }}
          onClick={handleBackButtonClick}
        >
          Back
        </button>

        <h3 className="text-3xl text-white font-semibold mb-4">Pokemon: <span className=" capitalize italic font-bold">{pokemonName.name}</span></h3>


        <section className="bg-black text-white p-4 rounded shadow-md max-w-xl w-full mx-auto">

          <h3 className="text-lg font-semibold mb-2">Saved Moves:</h3>

          {pokemonMoves.moves.map((move, index) => (
            <div key={index} className="mb-2">
              {move && (
                <div className="flex flex-col justify-center items-center">
                  <p className="text-base capitalize mr-2">
                    Move {index + 1}: {move?.name}
                  </p>
                  <p className="text-md capitalize">Type: {move.type}

                  </p>
                  <img
                    src={typeImages[move.type.toLowerCase()]} // Assuming move.type is the type name
                    alt={`${move.type} type`}
                    className="w-10 h-10 m-2"
                  />
                  <button
                    onClick={() => deleteMove(move)}
                    className="ml-auto bg-red-500 hover:bg-red-600 text-white text-sm mr-4 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </section>



        <h2 className="text-center text-2xl my-4">Movelist</h2>

        {moves.length > 0 && (
          <ul>
            {moves.map((move, index) => (
              <li key={"" + pokemonName.name + index}>
                {/* Pass move data as props to the Move component */}
                <MoveInfo
                  move={move.pokemon_v2_move.name}
                  type={move.pokemon_v2_move.pokemon_v2_type.name}
                  description={move.pokemon_v2_move.pokemon_v2_moveflavortexts[0]?.flavor_text}
                  userState={userState}
                  setUserState={setUserState}
                  stateTracker={stateTracker}
                  setStateTracker={setStateTracker}
                />
              </li>
            ))}
          </ul>
        )}

      </div>
    );
  }
}

export default PokemonEdit;
