import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
     user {
        _id
        username
        email
        notes {
          _id
          text
          createdAt
        }
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation REGISTER_USER($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
     user {
        _id
        username
        email
        notes {
          _id
          text
          createdAt
        }
      }
    }
  }
`;