import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Header(props) {
  const logout = async e => {
    e.preventDefault();

    await axios.get('/logout');

    props.setState((oldState) => {
      return {
        ...oldState,
        user: null
      };
    });
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b dark:bg-gray-900">
      <h3 className="text-xl font-semibold">Pokemon App</h3>

      <nav className="flex items-center space-x-4">
        {props.state.user && <p className="text-gray-600">Welcome, {props.state.user.username}</p>}
        <NavLink to="/" className="text-white-600 hover:text-gray-800">
          Home
        </NavLink>
        <NavLink to="/search" className="text-white-600 hover:text-gray-800">
          Pokemons
        </NavLink>
        {props.state.user ? (
          <>
            <NavLink to="/dashboard" className="text-white-600 hover:text-gray-800">
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
          <NavLink to="/auth" className="text-white-600 hover:text-gray-800">
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
