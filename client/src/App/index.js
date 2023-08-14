import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { AUTHENTICATE } from './queries';

import { useStore } from '../store';

// components
import Header from '../components/Header';
import Redirect from '../components/Redirect';
import Footer from '../components/Footer';

// pages
import AuthForm from '../pages/AuthForm';
import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';


function App() {
  const { dispatch, actions, loading } = useStore();
  const { data } = useQuery(AUTHENTICATE);

  useEffect(() => {
    if (data) {
      dispatch({
        type: actions.UPDATE_USER,
        payload: data.authenticate.user
      });

      dispatch({
        type: actions.TOGGLE_LOADING
      });

      return () => {
        if (loading) {
          dispatch({
            type: actions.TOGGLE_LOADING
          });
        }
      };
    }
  }, [loading, actions.UPDATE_USER, actions.TOGGLE_LOADING, dispatch, data]);

  return (
    <>
      <Header />

    
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={(
          <Redirect>
            <AuthForm />
          </Redirect>
        )} />

        <Route path="/dashboard" element={(
          <Redirect>
            <Dashboard />
          </Redirect>
        )} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
