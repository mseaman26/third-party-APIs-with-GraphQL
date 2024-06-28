import { gql } from '@apollo/client';



export const DASHBOARD_DATA = gql`
   query Query($city: String!, $sign: String!) {
  dashboard(city: $city, sign: $sign) {
    horoscope
    temperature
    weather
    weatherIcon
  }
}
`;
