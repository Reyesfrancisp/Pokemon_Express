const fetch = require('cross-fetch');

const getPokemonInfo = async (number) => {
  const endpoint = 'https://beta.pokeapi.co/graphql/v1beta';

  const numberSearchQuery = `query numberSearchquery {
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

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: numberSearchQuery }),
    });

    const parsedData = await response.json();
    const pokemon = parsedData.data.pokemon_v2_pokemon[0];

    const pokemonName = pokemon.name;
    const pokemonID = pokemon.id;
    const pokemonHeight = pokemon.height;
    const pokemonWeight = pokemon.weight;
    const type1 = pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name;
    const type2 = pokemon.pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name || '';

    return {
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
