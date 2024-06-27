import React, {useState} from 'react';
import styles from './SignupPage.module.css';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const SignupPage = () => {

    const [formState, setFormState] = useState({ username: '', password: '' });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addUser({ variables: { ...formState } });
            console.log(data);
            Auth.login(data.createUser.token);
            setFormState({ username: '', password: '' });
            
        } catch (e) {
            console.error(e);
        }
        
    }
    if (Auth.loggedIn()) {
        return <Navigate to="/" />;
    }
    return (
        <div className={styles.container}>
            <div className={styles.signupBox}>
                <h1>Sign up</h1>
                <form onSubmit={handleFormSubmit}>
                    <input 
                        name='username'
                        type="text" 
                        placeholder="Username" 
                        onChange={handleChange}
                    />
                    <input 
                        name='password'
                        type="password" 
                        placeholder="Password" 
                        onChange={handleChange}
                    />
                    <button type="submit">Submit</button>
                </form>
                <h2>Already have an account?</h2>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default SignupPage;
