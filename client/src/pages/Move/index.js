

function Movelist(props) {
  const { moves } = props;
  return (
    <div>
      <h2>Movelist</h2>
      <ul>
        {moves.map((move, index) => (
          <li key={index}>
            <p>{move.name}</p>
            <p>This is where the move info goes: {move.info}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movelist;
