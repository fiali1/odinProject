import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import sortDate from '../../utils/sortDate';

import './styles.css';

function Profile() {
    const user_id = localStorage.getItem('user_id');
    const user_username = localStorage.getItem('user_username');
    const [todos, setTodos] = useState([]);
    const [statusParameter, setStatusParameter] = useState(false);
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
            if (response.data.length === 0) {
                const tc = document.querySelector('.todos-container');
                const empty = document.createElement('div');
                empty.classList.add('empty-warning');
                empty.textContent = "It appears that you have no todos. Create one using the '+' button above!";
                tc.appendChild(empty);
            } else {
                setTodos(response.data);
            }
        });
    }, [user_id]);

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    // List options
    function showList(e) {
        e.target.parentElement.toggleAttribute('show');
    }

    function setParameter(target) {
        const button = document.querySelector('#parameter');
        const parameter = target.getAttribute('parameter');

        localStorage.setItem('parameter', parameter);

        switch (parameter) {
            case '0':
                setTodos(todos.slice(0).sort((a, b) => {
                    if (statusParameter)
                        return ((a.status > b.status)) ? 1 : -1;
                    else 
                        return ((a.status < b.status)) ? 1 : -1;
                }));
                button.textContent = statusParameter ? 'Status ↓' : 'Status ↑';
                setStatusParameter(!statusParameter);
                setTitleParameter(false);
                setDueDateParameter(false);
                setPriorityParameter(false);
                break;

            case '1':
                setTodos(todos.slice(0).sort((a, b) => {
                    if (!titleParameter)
                        return ((a.title > b.title)) ? 1 : -1;
                    else 
                        return ((a.title < b.title)) ? 1 : -1;
                }));
                button.textContent = titleParameter ? 'Title ↓' : 'Title ↑';
                setTitleParameter(!titleParameter);
                setStatusParameter(false);
                setDueDateParameter(false);
                setPriorityParameter(false);
                break;

            case '2':
                setTodos(todos.slice(0).sort((a, b) => {
                    if (dueDateParameter)
                        return (sortDate(a, b));
                    else 
                        return(sortDate(a, b) === 1 ? -1 : 1);
                }));
                button.textContent = dueDateParameter ? 'Due Date ↓' : 'Due Date ↑';
                setDueDateParameter(!dueDateParameter);
                setStatusParameter(false);
                setTitleParameter(false);
                setPriorityParameter(false);
                break;

            case '3':
                setTodos(todos.slice(0).sort((a, b) => {
                    if (priorityParameter)
                        return ((a.priority > b.priority)) ? 1 : -1;
                    else 
                        return ((a.priority < b.priority)) ? 1 : -1;
                }));
                button.textContent = priorityParameter ? 'Priority ↓' : 'Priority ↑';
                setPriorityParameter(!priorityParameter);
                setStatusParameter(false);
                setTitleParameter(false);
                setDueDateParameter(false);
                break;

            default:
                break;
        }

        button.parentElement.toggleAttribute('show');
    }


    // Todo controls
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
            }).then((response) => {
                // Updates local todo list to current status
                let newTodos = [];
                
                for(let i = 0; i < todos.length; i++) {
                    if (todos[i].id === id) {
                        const updated = response.data;
                        newTodos.push(updated);
                    } else 
                        newTodos.push(todos[i]);
                }

                setTodos(newTodos);
            });

        } catch (error) {
            alert('Error: failed to update status.');
        }
    }

    function showDetails(id) {
        localStorage.setItem('todo_id', id);
        history.push('/todos/details');
    }

    async function handleDeleteTodo(id) {
        api.delete(`todos/${id}`, {
            headers: {
                Authorization: user_id,
            }
        });

        const newTodos = todos.filter(todo => todo.id !== id);

        if (newTodos.length === 0) {
            const tc = document.querySelector('.todos-container');
            const empty = document.createElement('div');
            empty.classList.add('empty-warning');
            empty.textContent = "It appears that you have no todos. Create one using the '+' button above!";
            tc.appendChild(empty);
        }
        
        setTodos(todos.filter(todo => todo.id !== id));
    }

    return (
        <div className="container">
            <div className="profile">
                <div className="profile-info">
                    <h1>{user_username}</h1>
                    <div className="profile-btns">
                        <Link to="/settings" from="/profile" className="button">Settings</Link>    
                        <button className="button logout" onClick={handleLogout}>Logout</button>    
                    </div>
                </div>
                <div className="todos-profile-btns">
                    <div className="function-btns">
                        <Link className="button create-todo" to="/todos/new">
                            + Todo
                        </Link>
                    </div>
                    <div className="dropdown-sort">
                        <p>Order by</p>
                        <div className="dropdown-content">
                            <button id="parameter" className="button dropdown-btn" onClick={showList}>Parameter</button>
                            <div className="dropdown-list">
                                <p 
                                    parameter={0}
                                    onClick={e => setParameter(e.target)}>
                                    Status
                                </p>
                                <p 
                                    parameter={1}
                                    onClick={e => setParameter(e.target)}>
                                    Title
                                </p>
                                <p 
                                    parameter={2}
                                    onClick={e => setParameter(e.target)}>
                                    Due Date
                                </p>
                                <p 
                                    parameter={3}
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