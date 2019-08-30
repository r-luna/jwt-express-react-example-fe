import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import AccountCreate from './components/AccountCreate.jsx';

function AccountEmployer() {
  return <h2>Employer Account</h2>
}

function AppRouter() {
  return (
    <Router>
      <Nav />
      <div className="App">
        <Route path="/" exact component={Login} />
        <Route path="/dashboard/" component={Dashboard} />
        <Route path="/account/employer/" component={AccountEmployer} />
        <Route path="/account/create/" component={AccountCreate} />
        <Route path="/*" render={() => <Redirect to="/" />} />
      </div>
    </Router>
  );
}

export default AppRouter;
