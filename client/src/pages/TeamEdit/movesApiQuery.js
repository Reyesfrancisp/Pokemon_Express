const fetch = require('cross-fetch');

const getPokemonMoves = async (input) => {
  const endpoint = 'https://beta.pokeapi.co/graphql/v1beta';

  const number = Number(input);

  let query;

  query = `
    query samplePokeAPIquery {
        pokemon_v2_pokemon(where: {id: {_eq: ${number}}}) {
          pokemon_v2_pokemonmoves(distinct_on: id) {
            pokemon_v2_move {
              name
              pokemon_v2_type {
                name
              }
              pokemon_v2_moveflavortexts(where: {language_id: {_eq: 9}}, distinct_on: move_id) {
                flavor_text
              }
            }
          }
        }
      }
    `;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const parsedData = await response.json();

    return parsedData; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};


module.exports = getPokemonMoves;