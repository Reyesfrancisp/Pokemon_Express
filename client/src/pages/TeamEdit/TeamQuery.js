const fetch = require('cross-fetch');

const getPokemonInfo = async (input) => {
  const endpoint = 'https://beta.pokeapi.co/graphql/v1beta';

  const number = Number(input);
  const isNumber = !isNaN(number);

  let query;

  if (isNumber) {
    query = `
      query NumberSearchQuery {
        pokemon_v2_pokemon(where: {id: {_eq: ${number}}}) {
          name
          id
          height
          weight
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
        }
      }
    `;
  } else {
    const name = input.toLowerCase();
    query = `
      query NameSearchQuery {
        pokemon_v2_pokemon(where: {name: {_eq: "${name}"}}) {
          height
          id
          name
          weight
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
        }
      }
    `;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const parsedData = await response.json();
    const pokemon = parsedData.data.pokemon_v2_pokemon[0];
    const pokemonName = pokemon.name;
    const pokemonID = pokemon.id;
    const heightInInches = pokemon.height * 4;
    const feet = Math.floor(heightInInches / 12);
    const inches = heightInInches % 12;
    const pokemonHeight = `${feet}' ${inches}"`;
    const pokemonWeight = (pokemon.weight / 4.53947368421).toFixed(2);
    const type1 = pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name;
    const type2 = pokemon.pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name || '';
    const formattedID = pokemon.id.toString().padStart(3, '0'); // Converts to string and adds leading zeros

    return {
      formattedID,
      pokemonName,
      pokemonID,
      pokemonHeight,
      pokemonWeight,
      type1,
      type2,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getPokemonInfo;
