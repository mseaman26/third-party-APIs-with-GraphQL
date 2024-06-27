import { QUERY_ME } from '../utils/queries';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

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
    <div>
      <h1>Welcome, {user?.username}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default HomePage;