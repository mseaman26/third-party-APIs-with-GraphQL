import { DASHBOARD_DATA } from '../utils/queries';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styles from './HomePage.module.css';

import Auth from '../utils/auth';

const HomePage = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }
  const user = Auth.getProfile().data
  console.log('user: ', user)
  const { loading, data } = useQuery(DASHBOARD_DATA);
  console.log('data: ', data);

    //define variables for horoscope, weather, weatherIcon, and temperature
    const horoscope = data?.dashboard?.horoscope || '';
    const weather = data?.dashboard.weather || '';
    const weatherIcon = data?.dashboard.weatherIcon || '';
    const temperature = data?.dashboard.temperature || '';

 

  const logout = (event) => {

    Auth.logout();
  };

  if (!Auth.loggedIn()) {

    console.log('redirecting');
    return <Navigate to="/login" />;
  }
  if(loading){
    return <div>Loading...</div>  
  }
 
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Welcome, {user?.username}!</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <div className={styles.content}>
        <div className={styles.weather}>
          <h2 className={styles.weatherTitle}>Weather</h2>
          <p className={styles.weatherText}>{weather}</p>
          {weatherIcon && (
            <div className={styles.iconContainer}>
              <img
                className={styles.weatherIcon}
                src={`http://openweathermap.org/img/w/${weatherIcon}.png`}
                alt="weather icon"
              />
            </div>
          )}
            {temperature && <p className={styles.weatherTemperature}>{temperature}°F</p>}
        </div>
        <div className={styles.horoscope}>
          <h2>Horoscope</h2>
          <p>{horoscope}</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;