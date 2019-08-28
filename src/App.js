import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Nav from './components/nav.jsx';
import Login from './components/Login.jsx';

function Dashboard() {
  return <h2>Dashboard</h2>;
}

function CreateUser() {
  return <h2>Users</h2>;
}

function AppRouter() {
  return (
    <Router>
      <Nav />
      <div className="App">
        <Route path="/" exact component={Login} />
        <Route path="/dashboard/" component={Dashboard} />
        <Route path="/user/create/" component={CreateUser} />
        <Route path="/*" render={() => <Redirect to="/" />} />
      </div>
    </Router>
  );
}

export default AppRouter;
