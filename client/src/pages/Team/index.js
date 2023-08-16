import { useEffect, useState } from 'react';
import axios from 'axios';
import TeamComp from '../../components/TeamComp';
import LoadingSpinner from '../../components/Loading';

function TeamList(props) {
  const { userState, setUserState, stateTracker, setStateTracker } = props;
  console.log("This is the userState in the Team List: ", userState);
  const { username, teams } = userState;
  const [loading, setLoading] = useState(true);

  const handleCreateTeam = async () => {
    try {
      const response = await axios.post('/team', { name: 'New Team' }); // Include the 'name' field
      const newUserState = response.data.user;
      // Update userState to include the new team
      setUserState(newUserState);
    } catch (error) {
      console.error('Error creating a new team:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/user'); // Adjust the endpoint to your API
        const newUserState = response.data.user;
        setUserState(newUserState);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [setUserState]); // Empty dependency array ensures it runs only once on mount

  if (loading) {
    return <LoadingSpinner />; // You can show a loading modal here
  }

  return (
    <div className = "flex flex-col justify-center">
      <h2 className="text-center my-4 bg-teal-300">Below is a list of your teams, {username}!</h2>
      <div className="flex justify-center">
  <button
    className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md shadow-md mb-4"
    onClick={handleCreateTeam}
  >
    Create New Team
  </button>
</div>



      {teams.length > 0 && teams.map((team, index) => (
        <TeamComp key={index} teamData={team} userState = {setUserState} setUserState = {setUserState} stateTracker = {stateTracker} setStateTracker = {setStateTracker} />
      ))}

    </div>
  );
}

export default TeamList;
