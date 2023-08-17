import axios from "axios";

import bug from "../images/types/bug.png";
import dark from "../images/types/dark.png";
import dragon from "../images/types/dragon.png";
import electric from "../images/types/electric.png";
import fairy from "../images/types/fairy.png";
import fighting from "../images/types/fighting.png";
import fire from "../images/types/fire.png";
import flying from "../images/types/flying.png";
import ghost from "../images/types/ghost.png";
import grass from "../images/types/grass.png";
import ground from "../images/types/ground.png";
import ice from "../images/types/ice.png";
import normal from "../images/types/normal.png";
import poison from "../images/types/poison.png";
import psychic from "../images/types/psychic.png";
import rock from "../images/types/rock.png";
import steel from "../images/types/steel.png";
import water from "../images/types/water.png";

function MoveInfo(props) {
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
  //console.log("Move info route entered");
  const { move, type, description, stateTracker, setStateTracker } = props;
  const { pokemonID } = stateTracker;


  const addMoveToDatabase = async () => {
    try {
      const response = await axios.post('/addMove', {
        move,
        type,
        pokemonID
      });

      if (response.status === 200) {
        const newMoveID = response.data.moveID;
        setStateTracker(prevState => ({
          ...prevState,
          moveID: newMoveID
        }));
        console.log('Move route triggered!');
      } else {
        console.error('Failed to add move');
      }
    } catch (error) {
      console.error('Error adding move:', error);
    }
  };

  return (
    <section className="bg-gray-200 p-4 rounded-md  shadow-lg my-10 max-w-xl w-full mx-auto">
      <p className="text-lg font-semibold mb-2 capitalize">Move: {move}</p>
      <p className="text-base mb-2 capitalize">Type: {type}</p>
      <img
        src={typeImages[type]} // Assuming move.type is the type name
        alt={`${move.type} type`}
        className="w-10 h-10 mx-auto"
      />
      {description && (<p className="text-base my-4">Description: {description}</p>)}
      <button className="bg-blue-500 text-white px-4 py-2 my-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out" onClick={addMoveToDatabase}>
        Add Move
      </button>
    </section>

  );
}

export default MoveInfo;  