import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
// components
import Header from '../components/Header';
import Redirect from '../components/Redirect';
import Footer from '../components/Footer';
import About from '../pages/About';
import Contact from '../pages/Contact';

// pages
import AuthForm from '../pages/AuthForm';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import Search from '../pages/Search';
import TeamList from '../pages/Team';
import TeamEdit from '../pages/TeamEdit';
import PokemonEdit from '../pages/PokemonEdit';

function App() {
  const [state, setState] = useState({
    user: null,
    loading: true
  });

  const [userState, setUserState] = useState({
    user: "",
    teams: [],
    favorites: [],
  })

  const [stateTracker, setStateTracker] = useState({
    teamID: "",
    pokemonID: "",
    moveID: "",
  });


  useEffect(() => {
    axios.get('/authenticated')
      .then(res => {
        setState({
          ...state,
          user: res.data.user,
          loading: false
        });
      });
  }, []);


  return (

    <div className="flex flex-col min-h-screen min-w-screen">
      <Header state={state} setState={setState} />

      <section className="flex-grow">
        <Routes>

          <Route path="/" element={<Landing />} />

          {/* go to /auth if not logged in, otherwise /team */}
          {state.user ? (
            <Route path="/teams" element={<TeamList userState={userState} setUserState={setUserState} stateTracker={stateTracker} setStateTracker={setStateTracker} />} />
          ) : (
            <Route path="/teams" element={<Navigate to="/auth" />} />
          )}

          <Route path="/search" element={<Search state={state} setState={setState} />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />


          <Route path="/team-edit" element={<TeamEdit userState={userState} setUserState={setUserState} stateTracker={stateTracker} setStateTracker={setStateTracker} />} />

          <Route path="/pokemon-edit" element={<PokemonEdit userState={userState} setUserState={setUserState} stateTracker={stateTracker} setStateTracker={setStateTracker} />} />


          <Route path="/auth" element={(
            <Redirect user={state.user}>
              <AuthForm setState={setState} />
            </Redirect>
          )} />


          <Route path="*" element={<NotFound />} />
        </Routes>

      </section>
      <Footer />
    </div>
  );
}

export default App;
