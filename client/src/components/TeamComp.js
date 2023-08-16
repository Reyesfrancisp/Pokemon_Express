import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TeamComp(props) {
  const { teamData, userState, setUserState, stateTracker, setStateTracker } = props;
  const navigate = useNavigate();
  console.log ("This is the team data: ", teamData);

  const handleEditClick = () => {
    setStateTracker( { ...stateTracker, teamID: teamData._id});

    navigate('/team-edit');
  };

  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(`/team/${teamData._id}`);
      const newUserState = response.data.user;
      setUserState(...userState, newUserState);
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">{teamData.name}</h2>
      
      <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleEditClick}>
        Edit
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
}

export default TeamComp;
