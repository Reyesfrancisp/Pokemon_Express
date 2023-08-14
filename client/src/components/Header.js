import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { useStore } from '../store';

function Header() {
  const { dispatch, actions, user } = useStore();

  const logout = async e => {
    e.preventDefault();

    await axios.get('/api/logout');

    dispatch({
      type: actions.UPDATE_USER,
      payload: null
    });
  }

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b dark:bg-gray-900">
      <h3 className="text-xl font-semibold">Pokemon App</h3>

      <nav className="flex items-center space-x-4">
        {user && <p className="text-gray-600">Welcome, {user.username}</p>}
        <NavLink
          to="/"
          className="text-white-600 hover:text-gray-800"
         
        >
          Home
        </NavLink>
        {user ? (
          <>
            <NavLink
              to="/dashboard"
              className="text-white-600 hover:text-gray-800"
             
            >
              Dashboard
            </NavLink>
            <NavLink
              onClick={logout}
              to="/logout"
              className="text-white-600 hover:text-gray-800"
             
            >
              Log Out
            </NavLink>
          </>
        ) : (
          <NavLink
            to="/login"
            className="text-white-600 hover:text-gray-800"
           
          >
            Login
          </NavLink>
        )}
      </nav>
    </header>
  )
}

export default Header;
