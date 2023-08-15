

function TeamComp(props) {
  const { teamData } = props;

  // Render the team information using the teamData object
  return (
    <div>
      <h2>{teamData.name}</h2>
      {/* Render other team information */}
    </div>
  );
}

export default TeamComp;
