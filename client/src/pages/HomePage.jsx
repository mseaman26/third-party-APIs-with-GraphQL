import { QUERY_ME } from '../utils/queries';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styles from './HomePage.module.css';

import Auth from '../utils/auth';

const HomePage = () => {

  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  const logout = (event) => {

    Auth.logout();
  };

  if (!Auth.loggedIn()) {

    console.log('redirecting');
    return <Navigate to="/login" />;
  }
 
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Welcome, {user?.username}!</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <div className={styles.content}>
        <div className={styles.weather}>
          <h2>Weather</h2>

        </div>
        <div className={styles.horoscope}>
          <h2>Horoscope</h2>
        </div>
      </div>
    </div>
  );
}

export default HomePage;