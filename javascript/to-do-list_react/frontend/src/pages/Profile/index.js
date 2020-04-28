import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


import api from '../../services/api';

import './styles.css';

function Profile() {
    const user_id = localStorage.getItem('user_id');
    const user_username = localStorage.getItem('user_username');
    const [todos, setTodos] = useState([]);
    const [titleParameter, setTitleParameter] = useState(false);
    const [dueDateParameter, setDueDateParameter] = useState(false);
    const [priorityParameter, setPriorityParameter] = useState(false);

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: { 
                Authorization: user_id, 
            }
        }).then(response => {
            setTodos(response.data);
        });
    }, [user_id]);

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

        setTodos(todos.filter(todo => todo.id !== id));
    }

    function setParameter(target) {
        const button = document.querySelector('#parameter');
        const parameter = target.getAttribute('parameter');

        switch (parameter) {
            case '0':
                setTodos(todos.slice(0).sort((a, b) => {
                    if (!titleParameter)
                        return ((a.title > b.title)) ? 1 : -1;
                    else 
                        return ((a.title < b.title)) ? 1 : -1;
                }));
                button.textContent = titleParameter ? 'Title ↓' : 'Title ↑';
                setTitleParameter(!titleParameter);
                setDueDateParameter(false);
                setPriorityParameter(false);
                break;

            case '1':
                //implementar ordenação de data
                button.textContent = 'Due Date';
                setDueDateParameter(!dueDateParameter);
                setTitleParameter(false);
                setPriorityParameter(false);
                break;

            case '2':
                setTodos(todos.slice(0).sort((a, b) => {
                    if (priorityParameter)
                        return ((a.priority > b.priority)) ? 1 : -1;
                    else 
                        return ((a.priority < b.priority)) ? 1 : -1;
                }));
                button.textContent = priorityParameter ? 'Priority ↓' : 'Priority ↑';
                setPriorityParameter(!priorityParameter);
                setTitleParameter(false);
                setDueDateParameter(false);
                break;

            default:
                break;
        }
    }

    function showDetails(id) {
        localStorage.setItem('todo_id', id);
        history.push('/todos/details');
    }

    async function setStatus(e, id) {
        const div = e.target.parentElement.parentElement;
        if (div.getAttribute('done') === "1")
            div.setAttribute('done', "0");
        else 
            div.setAttribute('done', "1");

        try {
            await api.put(`todos/status/${id}`, {}, {
                headers: {
                    Authorization: user_id,
                }
            });
        } catch (error) {
            alert('Error: failed to update status.');
        }
    }

    return (
        <div className="container">
            <div className="profile">
                <div className="profile-info">
                    <h1>{user_username}</h1>
                    <div className="profile-btns">
                        <button className="button settings" >Settings</button>    
                        <button className="button logout" onClick={handleLogout}>Logout</button>    
                    </div>
                </div>
                <div className="todos-profile-btns">
                    <Link className="button create-todo" to="/todos/new">
                        + Todo
                    </Link>
                    <div className="dropdown-sort">
                        <p>Order by</p>
                        <div className="dropdown-content">
                            <button id="parameter" className="button dropdown-btn">Parameter</button>
                            <div className="dropdown-list">
                                <p 
                                    parameter={0}
                                    onClick={e => setParameter(e.target)}>
                                    Title
                                </p>
                                <p 
                                    parameter={1}
                                    onClick={e => setParameter(e.target)}>
                                    Due Date
                                </p>
                                <p 
                                    parameter={2}
                                    onClick={e => setParameter(e.target)}>
                                    Priority
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="todos-container">
                    {todos.map(todo => (
                        <div className="todo-profile" done={todo.status === 1 ? '1' : '0'} key={todo.id} status={todo.status}>
                            <div className="todo-profile-info">
                                <input type="checkbox" defaultChecked={todo.status} onClick={(e) => setStatus(e, todo.id)} />
                                <h3>{todo.title}</h3>
                            </div>
                            <div className="todo-profile-btns">
                                <button className="button" onClick={() => showDetails(todo.id)}>Details</button>
                                <button className="button delete" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                            </div>
                        </div>
                    ))}                    
                </div>
            </div>
        </div>
    );
}

export default Profile;