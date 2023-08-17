
import { useState, useEffect } from 'react';
import axios from 'axios';
import MoveInfo from "../../components/MoveInfo";
import LoadingSpinner from "../../components/Loading";
import getPokemonMoves from "./movesApiQuery";
import { Navigate } from 'react-router-dom';

function PokemonEdit(props) {
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
      <div className="bg-gray-300 p-8 rounded-md shadow-md">

        <h2 className="text-center text-3xl font-semibold mb-4">Pokemon: <span className=" capitalize italic">{pokemonName.name}</span></h2>




        <section>
          <p> Saved Moves: </p>
          {pokemonMoves.moves.map((move, index) => (
            <div key={index}>
              {move && (
                <p>
                  Move {index + 1}: {move?.name} Type: {move?.type}
                  <button onClick={() => deleteMove(move)}>Delete</button>
                </p>
              )}
            </div>
          ))}
        </section>




        <h2 className="text-center text-2xl mb-2">Movelist</h2>

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
