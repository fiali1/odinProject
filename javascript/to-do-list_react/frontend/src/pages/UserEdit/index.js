import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api';

import './styles.css';

function UserEdit() {
    const user_id = localStorage.getItem('user_id');
    const [user, setUser] = useState({});
    const [username, setUsername] = useState(user.username);

    const history = useHistory();

    useEffect(() => {
        api.get(`users/${user_id}`)
            .then(response => {
                setUser(response.data)
            });
    }, [user_id]);

    async function handleEditUser(e) {
        e.preventDefault();

        const data = {
            username,
        };

        try {
            api.put(`users/${user_id}`, data)
                .then(() => {
                    localStorage.setItem('user_username', username);
                    history.push('/profile');
                });
        } catch (error) {
            alert('Error: Failed to update user. Please try again');
        }
    }

    return (
        <div className="container">
            <div className="edit-user">
                <h2>Username: {user.username}</h2>
                <form className="edit-user-form" onSubmit={handleEditUser}>
                    <span>New username</span>
                    <input type="text" onChange={e => setUsername(e.target.value)} required />

                    <button className="button submit" type="submit">Update</button>
                    <Link to="/profile" className="button cancel">Cancel</Link>
                </form>
            </div>
        </div>
    );
}

export default UserEdit;