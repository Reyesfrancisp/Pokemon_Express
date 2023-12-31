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
    <div className="flex flex-col items-center justify-center mt-10 mb-60">
      <h3 className="text-2xl lg:text-4xl font-bold text-center my-4 text-slate-900">
        Welcome to Your Pokemon Teams, {username}!
      </h3>
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md shadow-md max-w-md mb-4"
        onClick={handleCreateTeam}
      >
        Create New Team
      </button>
      <p className="text-xl lg:text-2xl font-semibold text-slate-900 text-center mb-6">
        Here's a list of your teams:
      </p>

      {teams.length > 0 && teams.map((team, index) => (
        <TeamComp key={index} teamData={team} userState={setUserState} setUserState={setUserState} stateTracker={stateTracker} setStateTracker={setStateTracker} />
      ))}

    </div>
  );
}

export default TeamList;
