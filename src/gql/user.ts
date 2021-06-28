import { gql } from '@apollo/client';

export const FETCH_USERS = gql`
  query Users($input: UserQueryInput) {
    Users(input: $input) {
      paging {
        total
      }
      data {
        _id
        email
        firstName
        lastName
        role
        createdAt
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UserUpdate($input: UserUpdateInput!) {
    UserUpdate(input: $input) {
      _id
      firstName
      lastName
    }
  }
`;

export const CREATE_USER = gql`
  mutation Signup($input: SignUpInput!) {
    Signup(input: $input) {
      _id
    }
  }
`;
