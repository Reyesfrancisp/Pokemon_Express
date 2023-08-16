import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Header(props) {
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();

    await axios.get("/logout");

    props.setState((oldState) => {
      return {
        ...oldState,
        user: null,
      };
    });

    // Redirect the user to the root path ("/") after logout
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b dark:bg-gray-900">
      <div className="flex items-center">
        <img
          src="/finalLogo.png"
          alt="Final Logo"
          className="w-12 h-auto ml-4 mr-4"
        />
        <h3 className="text-xl font-semibold">
          <NavLink to={props.state.user ? "/" : "/"}>Pokedex Express</NavLink>
        </h3>
      </div>

      <nav className="flex items-center space-x-4">
        {props.state.user && (
          <p className="text-xl">
            Welcome,{" "}
            <span className="text-transparent bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text font-bold">
              {props.state.user.username}
            </span>
          </p>
        )}
        {/* Name this NavLink based on the users logging status */}
        <NavLink
          to={props.state.user ? "/teams" : "/"}
          className="text-white-600 hover:text-gray-800"
        >
          {props.state.user ? "Teams" : "Home"}
        </NavLink>
        <NavLink to="/search" className="text-white-600 hover:text-gray-800">
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
          <NavLink to="/auth" className="text-white-600 hover:text-gray-800">
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
