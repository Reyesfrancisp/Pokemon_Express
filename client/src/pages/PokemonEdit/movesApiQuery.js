const fetch = require('cross-fetch');

const getPokemonMoves = async (input) => {
  const endpoint = 'https://beta.pokeapi.co/graphql/v1beta';

  const nameInput = input.toLowerCase();
  let query;
  console.log("This is the name input in the query: ", nameInput);
  query = `
    query MoveSearchAPIquery {
      pokemon_v2_pokemon(where: {name: {_eq: "${nameInput}"}}) {
        name
        pokemon_v2_pokemonmoves(distinct_on: move_id) {
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
    const moveData = parsedData.data.pokemon_v2_pokemon[0].pokemon_v2_pokemonmoves;
    console.log("This is the parsed data in the moves api query: ", moveData);
    return moveData; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export default getPokemonMoves;