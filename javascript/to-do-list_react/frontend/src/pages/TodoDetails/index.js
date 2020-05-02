import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import convertPriority from '../../utils/convertPriority';
import convertDate from '../../utils/convertDate';

import './styles.css';

function TodoDetails() {
    const user_id = localStorage.getItem('user_id');
    const user_username = localStorage.getItem('user_username');
    const id = localStorage.getItem('todo_id');
    
    const [todo, setTodo] = useState({});

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

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    async function handleDeleteTodo(id) {
        api.delete(`todos/${id}`, {
            headers: {
                Authorization: user_id,
            }
        });

        localStorage.removeItem('todo_id');
        history.push('/profile');
    }

    async function handleGoBack() {
        localStorage.removeItem('todo_id');
        history.push('/profile');
    }

    async function setStatus(e) {
        const div = e.target.parentElement.parentElement.parentElement;
        if (div.getAttribute('done') === "1")
            div.setAttribute('done', "0");
        else 
            div.setAttribute('done', "1");

        try {
            
            await api.put(`todos/status/${id}`, {}, {
                headers: {
                    Authorization: user_id,
                }
            }).then(response => {
                setTodo(response.data);
            });
        } catch (error) {
            alert('Error: failed to update status.');
        }

    }

    function checkStatus() {
        console.log(todo);
    }

    return (
        <div className="container">
            <div className="details">
                <div className="profile-info">
                    <h1>{user_username}</h1>
                    <div className="profile-btns">
                        <Link to="/settings" from='/todos/details' className="button">Settings</Link>    
                        <button className="button logout" onClick={handleLogout}>Logout</button>    
                    </div>
                </div>
                <div className="todo-details-btns">
                    
                </div>
                <div className="todo-details-container">
                    <div className="todo-details" done={todo.status === 1 ? "1" : "0"}>
                        <div className="todo-details-main">
                            <div className="todo-details-info">
                                <input type="checkbox" defaultChecked={todo.status} onClick={setStatus} />
                                <h2>{todo.title}</h2>
                            </div>
                            <div className="todo-details-btns">
                                <Link to="/todos/edit" className="button" >Edit</Link>
                                <button className="button delete" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                            </div>
                            </div>
                        <div className="todo-details-extras">
                            <h3>{todo.description}</h3>
                            <p><strong>Due date:</strong> {convertDate(todo.dueDate)}</p>
                            <p><strong>Priority:</strong> {convertPriority(todo.priority)}</p>
                        </div>
                    </div>
                    <button className="button back" onClick={handleGoBack}>Go back</button>
                    <button className="button" onClick={checkStatus}>Status</button>
                </div>
            </div>
        </div>
    );
}

export default TodoDetails;