import { gql } from '@apollo/client';



export const DASHBOARD_DATA = gql`
query Query {
  dashboard {
    weather
    temperature
    horoscope
    weatherIcon
  }
}
`;
