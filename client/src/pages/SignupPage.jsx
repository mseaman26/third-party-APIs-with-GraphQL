import React, {useState, useEffect} from 'react';
import styles from './SignupPage.module.css';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const SignupPage = () => {

    const [formState, setFormState] = useState({ username: '', password: '' });
    const [selectedSign, setSelectedSign] = useState('aries');
    const [createUser, { error }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('formstate submitted: ', formState)
            const { loading, data } = await createUser({ variables: { ...formState } });
            if(error) {
                console.log(error);
            }
            console.log(data);
            Auth.login(data.createUser.token);
            setFormState({ username: '', password: '' });
            
        } catch (e) {
            console.error(e);
        }
        
    }

    useEffect(() => {
        console.log('formstate: ', formState)
    }, [formState])
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
                    {/* input for city */}
                    <input 
                        name='city'
                        type="text" 
                        placeholder="City" 
                        onChange={handleChange}
                    />
                    {/* dropdown for astrological sign */}
                   
                    <div className={styles.signSelection}>
                    <label className={styles.signLabel} htmlFor="sign">
                        Choose your astrological sign:
                    </label>
                    <select
                        className={styles.signSelect}
                        name="sign"
                        id="sign"
                        onChange={handleChange}
                    >
                        <option></option>
                        <option value="aries">Aries</option>
                        <option value="taurus">Taurus</option>
                        <option value="gemini">Gemini</option>
                        <option value="cancer">Cancer</option>
                        <option value="leo">Leo</option>
                        <option value="virgo">Virgo</option>
                        <option value="libra">Libra</option>
                        <option value="scorpio">Scorpio</option>
                        <option value="sagittarius">Sagittarius</option>
                        <option value="capricorn">Capricorn</option>
                        <option value="aquarius">Aquarius</option>
                        <option value="pisces">Pisces</option>
                    </select>
    </div>
                    
                    <button type="submit">Submit</button>
                </form>
                <h2>Already have an account?</h2>
                <Link to="/login">Login</Link>
                <div className={styles.errorMessage}>
                    {error && (
                        <div>
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
