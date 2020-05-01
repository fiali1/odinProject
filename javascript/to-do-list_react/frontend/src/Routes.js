import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import UserEdit from './pages/UserEdit';
import UserDelete from './pages/UserDelete';
import NewTodo from './pages/NewTodo';
import TodoDetails from './pages/TodoDetails';
import TodoEdit from './pages/TodoEdit';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/settings" component={Settings} />
                <Route path="/users/edit" component={UserEdit} />
                <Route path="/users/delete" component={UserDelete} />
                <Route path="/todos/new" component={NewTodo} />
                <Route path="/todos/edit" component={TodoEdit} />
                <Route path="/todos/details" component={TodoDetails} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;