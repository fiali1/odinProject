import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

function Settings() {
    const user_username = localStorage.getItem('user_username');

    const history = useHistory();

    function handleGoBack() {
        history.goBack();
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="container">
            <div className="settings">
                <div className="profile-info">
                    <h1>{user_username}</h1>
                    <div className="profile-btns">
                        <button className="button settings-btn" onClick={handleGoBack}>Settings</button>    
                        <button className="button logout" onClick={handleLogout}>Logout</button>    
                    </div>
                </div>
                <div className="settings-list">
                    <Link className="button settings-item" to="/users/edit">Edit profile</Link>
                    <Link className="button delete settings-item" to="/users/delete">Delete profile</Link>
                </div>
            </div>
        </div>
    );
}

export default Settings;