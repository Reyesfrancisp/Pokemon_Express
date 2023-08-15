import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM directly
import './index.scss';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root'); // No need to createRoot
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  root
);

const endpoint = 'https://beta.pokeapi.co/graphql/v1beta';
const query = `
  query samplePokeAPIquery {
    pokemon_v2_pokemon {
      id
      name
      height
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      weight
    }
  }
`;

fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query }),
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
