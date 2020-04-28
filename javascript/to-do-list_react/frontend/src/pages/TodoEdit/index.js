import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api';

import './styles.css';

function TodoEdit() {
    const user_id = localStorage.getItem('user_id');
    const id = localStorage.getItem('todo_id');

    const [todo, setTodo] = useState({});
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [dueDate, setDueDate] = useState(todo.dueDate);
    const [priority, setPriority] = useState(todo.priority);

    const history = useHistory();

    useEffect(() => {
        api.get(`todos/${id}`, {
            headers: { 
                Authorization: user_id, 
            }
        }).then(response => {
            setTodo(response.data);
        });
    }, [user_id, id]);

    async function handleEditTodo(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            dueDate,
            priority
        };

        try {
            await api.put(`todos/edit/${id}`, data, {
                headers: {
                    Authorization: user_id,
                }
            });
            history.push('/todos/details');
        } catch (error) {
            alert('Error: Failed to create todo. Please try again');
        }
    }

    return (
        <div className="container">
            <div className="edit-todo">
                <h2>Enter your Todo info</h2>
                <form className="edit-todo-form" onSubmit={handleEditTodo}>
                    <span>Title</span>
                    <input type="text" defaultValue={todo.title} onChange={e => setTitle(e.target.value)} required />

                    <span>Description</span>
                    <textarea defaultValue={todo.description} cols="20" rows="3" maxLength="451" onChange={e => setDescription(e.target.value)}></textarea>

                    <span>Due Date</span>
                    <input type="date" defaultValue={todo.dueDate} onChange={e => setDueDate(e.target.value)} />

                    <span>Priority</span>
                    <div className="priority-radio">
                        <input 
                            type="radio" 
                            id="low-priority" 
                            name="priority" 
                            onChange={e => setPriority(0)} 
                            required 
                        />
                        <label 
                            htmlFor="low-priority">
                            Low
                        </label><br />
                        
                        <input 
                            type="radio" 
                            id="medium-priority" 
                            name="priority"
                            onChange={e => setPriority(1)} 
                            required />
                        <label 
                            htmlFor="medium-priority">
                            Medium
                        </label><br />
                        
                        <input 
                            type="radio" 
                            id="high-priority" 
                            name="priority" 
                            onChange={e => setPriority(2)} 
                            required 
                        />
                        <label 
                            htmlFor="high-priority">
                            High
                        </label><br />
                    </div>
                    <button className="button submit" type="submit">Submit</button>
                    <Link to="/todos/details" className="button cancel">Cancel</Link>
                </form>
            </div>
        </div>
    );
}

export default TodoEdit;