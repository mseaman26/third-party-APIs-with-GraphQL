import { gql } from '@apollo/client';



export const QUERY_ME = gql`
  query Query {
    me {
      _id
      city
      sign
      username
    }
}
`;
