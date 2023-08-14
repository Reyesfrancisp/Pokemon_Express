import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
  query GetPokemon($query: String!, $page: Int!) {
    pokemon(query: $query, page: $page) {
      name
      pictureUrl
      type
      symbol
    #   // ... other fields we might need
    }
  }
`;
