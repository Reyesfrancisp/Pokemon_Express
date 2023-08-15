

function TeamComp(props) {
  const { teamData } = props;

  // Render the team information using the teamData object
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">{teamData.name}</h2>
      {/* Render other team information */}
      
      <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
    </div>
  );
}

export default TeamComp;
