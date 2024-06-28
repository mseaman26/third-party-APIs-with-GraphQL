import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      city
      sign
      username
    }
  }
}
`;

export const ADD_USER = gql`
    mutation Mutation($username: String!, $password: String!, $city: String!, $sign: String!) {
  createUser(username: $username, password: $password, city: $city, sign: $sign) {
    user {
      _id
      city
      sign
      username
    }
    token
  }
}
`;

