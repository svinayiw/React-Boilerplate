import { gql } from '@apollo/client';

export const AUTH = gql`
  query GetUserAuth {
    AuthUser @client {
      token
      isLoggedIn
      user {
        _id
      }
    }
  }
`;
