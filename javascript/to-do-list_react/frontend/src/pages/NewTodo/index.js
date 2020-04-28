import React, { useState } from 'react';

import api from '../../services/api';
import { useHistory } from 'react-router-dom';

import './styles.css';

function NewTodo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState(-1);

    const history = useHistory();

    async function handleNewTodo(e) {
        e.preventDefault();

        const user_id = localStorage.getItem('user_id');

        const data = {
            title,
            description,
            dueDate,
            priority
        };

        try {
            await api.post('todos', data, {
                headers: {
                    Authorization: user_id,
                }
            });

            history.push('/profile');
        } catch (error) {
            alert('Error: Failed to create todo. Please try again');
        }
    }

    function handleCancel() {
        history.push('/profile');
    }

    return (
        <div className="container">
            <div className="new-todo">
                <h2>Enter your Todo info</h2>
                <form className="new-todo-form" onSubmit={handleNewTodo}>
                    <span>Title</span>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />

                    <span>Description</span>
                    <textarea value={description} cols="20" rows="3" maxLength="451" onChange={e => setDescription(e.target.value)}></textarea>

                    <span>Due Date</span>
                    <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />

                    <span>Priority</span>
                    <div className="priority-radio">
                        <input type="radio" id="low-priority" name="priority" onChange={e => setPriority(0)} required />
                        <label htmlFor="low-priority">Low</label><br />
                        <input type="radio" id="medium-priority" name="priority" onChange={e => setPriority(1)} required />
                        <label htmlFor="medium-priority">Medium</label><br />
                        <input type="radio" id="high-priority" name="priority" onChange={e => setPriority(2)} required />
                        <label htmlFor="high-priority">High</label><br />
                    </div>
                    <button className="button submit" type="submit">Submit</button>
                    <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default NewTodo;