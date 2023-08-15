
import TeamComp from "../../components/TeamComp";

function TeamList(props) {
  const teamsData = [
    // ... an array of team data objects
  ];

  return (
    <div>
        <h2 class = "text-center my-4">Below is a list of your teams, user!</h2>
      {teamsData.map((team, index) => (
        <TeamComp key={index} teamData={team} />
      ))}
    </div>
  );
}

export default TeamList;
