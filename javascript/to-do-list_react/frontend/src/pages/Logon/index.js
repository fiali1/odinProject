import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

function Logon() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await api.post('session', { username, password });
            console.log(response.data);
            
            localStorage.setItem('user_id', response.data.id);
            localStorage.setItem('user_username', response.data.username);

            history.push('/profile');
        } catch (error) {
            switch (error.response.status) {
                case 400:
                    alert('Error: No user found. Please try again.');
                    break;
                case 401:
                    alert('Error: Wrong password. Please try again.');
                    break;
                default:
                    return;
            }
        }
        
    }

    return (
        <div className="container">
            <h1 className="title">Online Todo List</h1>
            <div className="logon">
                <div className="logon-info">
                    <h2>Sign in</h2>
                    <form onSubmit={handleSubmit}>
                        <span>Username</span>
                        <input 
                            type="text" 
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                        <span>Password</span>
                        <input 
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button className="button">Sign in</button>
                    </form>
                    <Link to="/register" className="link">I don't have an account</Link>
                </div>
            </div>
        </div>
    );
}

export default Logon;