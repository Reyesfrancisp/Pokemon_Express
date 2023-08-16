import MoveInfo from "../../components/MoveInfo";
import LoadingSpinner from "../../components/Loading";

function PokemonEdit(props) {
  const { moves } = props;

  // Only render the component when moves data is available
  if (!moves || moves.length === 0) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <div>
      <h2>Movelist</h2>
      <ul>
        {moves.map((move, index) => (
          <li key={index}>
            {/* Pass move data as props to the Move component */}
            <MoveInfo move={move.name} type={move.type} description={move.description} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonEdit;
