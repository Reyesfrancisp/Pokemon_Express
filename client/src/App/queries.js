import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  query {
    authenticate {
      user {
        _id
        username
        email
        notes {
          _id
          text
          author {
            _id
            username
            createdAt
          }
          createdAt
        }
      }
    }
  }
`;