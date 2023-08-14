const fetch = require('cross-fetch');

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
          pokemon_v2_moves {
            name
            pokemon_v2_type {
              name
            }
          }
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
    firstPokemon = data.data.pokemon_v2_pokemon[0];
    console.log(firstPokemon);
    console.log(firstPokemon.pokemon_v2_pokemontypes);
  })
  .catch(error => {
    console.error(error);
  });