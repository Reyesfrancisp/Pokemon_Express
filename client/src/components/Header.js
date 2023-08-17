import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
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
    <div>

      <nav className="bg-gradient-to-r from-green-700 to-green-400">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <img
                  className="rounded-full h-8 w-8 mr-4"
                  src="/finalLogo.png"
                  alt="Final Logo"
                />
                <h1 className="text-2xl font-bold ex">
                  <NavLink to={props.state.user ? "/" : "/"}>Pokedex Express</NavLink>
                </h1>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <motion.div
                  className="box"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <NavLink
                    to="/"
                    className="text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </NavLink>
                </motion.div>
                <motion.div
                  className="box"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <NavLink
                    to="/donation"
                    className="text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Donate
                  </NavLink>
                </motion.div>

                <motion.div
                  className="box"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <NavLink
                    to="/search"
                    className="text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    PokeDex
                  </NavLink>
                </motion.div>

                <motion.div
                  className="box"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <NavLink
                    to="/teams"
                    className="text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Teams
                  </NavLink>
                </motion.div>

                {/* Conditionally render logout or login NavLink */}
                {props.state.user ? (
                  <motion.div
                    className="box"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <NavLink
                      onClick={logout}
                      to="/"
                      className="text-white px-3 py-2 rounded-md text-md font-medium"
                    >
                      Log Out
                    </NavLink>
                  </motion.div>
                ) : (
                  <motion.div
                    className="box"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <NavLink
                      to="/auth"
                      className="text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </NavLink>
                  </motion.div>
                )}
              </div>
              <div className="-mr-2 flex lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-300 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>


          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div className="lg:hidden" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <NavLink
                    to="/"
                    className="text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Home
                  </NavLink>
                  {/* Link to Teams */}
                  <NavLink
                    to="/teams"
                    className="text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Teams
                  </NavLink>
                  <NavLink
                    to="/donation"
                    className="text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Donate
                  </NavLink>
                  <NavLink to="/search" className="text-white block px-3 py-2 rounded-md text-base font-medium">
                    PokeDex
                  </NavLink>
                  {props.state.user ? (
                    <>
                      {/* <NavLink to="/dashboard" className="text-white block px-3 py-2 rounded-md text-base font-medium">
              Dashboard
            </NavLink> */}
                      <NavLink
                        onClick={logout}
                        to="/"
                        className="text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        Log Out
                      </NavLink>
                    </>
                  ) : (
                    <NavLink to="/auth" className="text-white block px-3 py-2 rounded-md text-base font-medium">
                      Login
                    </NavLink>
                  )}

                </div>
              </div>
            )}
          </Transition></header>
      </nav>


    </div>
  );
}

export default Header;