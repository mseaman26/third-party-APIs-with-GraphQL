import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({ variables: { ...formState } });
            Auth.login(data.login.token);
            setFormState({ username: '', password: '' });
        } catch (e) {
            console.error(e);
        }
        
    };

    if (Auth.loggedIn()) {
        return <Navigate to="/" />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h1>Login</h1>
                <form onSubmit={handleFormSubmit}>
                    <input 
                        name='username' 
                        type="text" 
                        placeholder="Username"
                        value={formState.username}
                        onChange={handleChange} 
                    />
                    <input 
                        name='password' 
                        type="password" 
                        placeholder="Password"
                        value={formState.password}
                        onChange={handleChange} 
                    />
                    <button type="submit">Submit</button>
                </form>
                <h2>Don't have an account?</h2>
                <Link to="/signup">Signup</Link>
                {error && (
                    <div className={styles.errorMessage}>
                        {error.message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginPage;
