import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';
import WithAuth from './components/WithAuth';

import AllCollections from './components/collections/AllCollections';
import ExpandedCollection from './components/collections/ExpandedCollection';
import SavedCollections from './components/collections/SavedCollections';

import './App.css';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState('');

  return (
    <Router>
      <Nav loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <main>
        <Switch>
          <Route path="/register">
            <Register setLoggedInUser={setLoggedInUser} />
          </Route>

          <Route path="/login">
            <Login setLoggedInUser={setLoggedInUser} />
          </Route>

          <Route path="/profile">
            {/* To protect a route, simply wrap it with a WithAuth component */}
            <WithAuth Component={Profile} />
          </Route>

          <Route path="/collections/user/:userId">
            <AllCollections userCollections loggedInUser={loggedInUser} />
          </Route>

          <Route path="/collections/:id">
            <ExpandedCollection loggedInUser={loggedInUser} />
          </Route>

          <Route path="/savedcollections">
            <SavedCollections loggedInUser={loggedInUser} />
          </Route>

          <Route path="/" exact>
            <AllCollections loggedInUser={loggedInUser} />
          </Route>

          <Route path="/">
            <PageNotFound />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
