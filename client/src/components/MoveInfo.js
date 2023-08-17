import axios from "axios";

function MoveInfo(props) {
  //console.log("Move info route entered");
  const { move, type, description, stateTracker, setStateTracker } = props;
  const { pokemonID} = stateTracker;

  
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
    <section className="bg-gray-100 p-4 rounded-md shadow-md my-4">
      <p className="text-lg font-semibold mb-2 capitalize">Move: {move}</p>
      <p className="text-base mb-2 capitalize">Type: {type}</p>
      {description && (<p className="text-base mb-4">Description: {description}</p> )}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out" onClick={addMoveToDatabase}>
        Add Move
      </button>
    </section>

  );
}

export default MoveInfo;  