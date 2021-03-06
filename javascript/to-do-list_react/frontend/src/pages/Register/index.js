import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const response = await api.post('users', {username, password});
            api.post('preferences', {
                user_id: response.data.id
            });

            alert('Your ID is ' + response.data.id);
            
            history.push('/');
        } catch (error) {
            console.log(error.response);
            
        }
    }

    return (
        <div className="container">
            <div className="register">
                <div className="register-info">
                    <form onSubmit={handleRegister}>
                        <h2>Create your account</h2>
                        <span>Username</span>
                        <input 
                            type="text" 
                            value={username}
                            spellCheck="false"
                            onChange={e => setUsername(e.target.value)}
                        />
                        <span>Password</span>
                        <input 
                            type="password" 
                            minLength="3"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button className="button">Register</button>
                        <Link to="/" className="button cancel">Go back</Link>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Register;