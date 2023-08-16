import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header(props) {
  const navigate = useNavigate();

  const logout = async e => {
    e.preventDefault();

    await axios.get('/logout');

    props.setState(oldState => {
      return {
        ...oldState,
        user: null
      };
    });

    // Redirect the user to the root path ("/") after logout
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b dark:bg-gray-900">
      <h3 className="text-xl font-semibold">
        <NavLink to={props.state.user ? '/team' : '/'}>Pokemon App</NavLink>
      </h3>

      <nav className="flex items-center space-x-4">
        {props.state.user && (
          <p className="text-xl">
            Welcome,{' '}
            <span className="text-transparent bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text font-bold">
              {props.state.user.username}
            </span>
          </p>
        )}
        <NavLink
          to={props.state.user ? '/team' : '/'}
          className="text-white-600 hover:text-gray-800"
        >
          Home
        </NavLink>
        <NavLink
          to="/search"
          className="text-white-600 hover:text-gray-800"
        >
          PokeDex
        </NavLink>
        {props.state.user ? (
          <>
            {/* <NavLink to="/dashboard" className="text-white-600 hover:text-gray-800">
              Dashboard
            </NavLink> */}
            <NavLink
              onClick={logout}
              to="/"
              className="text-white-600 hover:text-gray-800"
            >
              Log Out
            </NavLink>
          </>
        ) : (
          <NavLink
            to="/auth"
            className="text-white-600 hover:text-gray-800"
          >
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
