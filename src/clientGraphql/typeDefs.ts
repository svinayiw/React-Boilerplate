import { gql } from '@apollo/client';

export const typeDefs = gql`
  type AuthUserDetail {
    _id: String
    role: String
  }

  extend type Query {
    isLoggedIn: Boolean!
    user: AuthUserDetail
    accessToken: String
  }
`;
