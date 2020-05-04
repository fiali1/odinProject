/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

function UserDelete() {
    const user_id = localStorage.getItem('user_id');
    const user_username = localStorage.getItem('user_username');

    const history = useHistory();

    async function handleDeleteUser(e) {
        e.preventDefault();

        try {
            api.delete(`users/${user_id}`, {
                headers: {
                    authorization: user_id
                }
            }).then(() => {
                localStorage.clear();
                history.push('/');
            });
        } catch (error) {
            alert('Error: failed to delete user.');
        }
    }

    return (
        <div className="container">
            <div className="delete-user">
                <h3>{user_username}, are you sure you want to delete your profile?</h3>
                <p>(This can't be undone)</p>
                <form className="delete-user-form" onSubmit={handleDeleteUser}>
                    <button className="button confirm" type="submit">Confirm</button>
                    <Link to="/profile" className="button cancel">Cancel</Link>
                </form>
            </div>
        </div>
    );
}

export default UserDelete;