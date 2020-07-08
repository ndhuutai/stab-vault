import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from '../pages/login/login.page';
import Register from '../pages/register/register.page';
import Settings from '../pages/settings/settings.page';
import NotFound from '../pages/not-found/not-found.page';
import MyPaths from '../pages/my-paths/my-paths.page';
import PathEditor from '../pages/path-editor/path-editor.page';
import PathViewer from '../pages/path-viewer/path-viewer.page';
import CollectionForm from '../pages/collection-form/collection-form.page';
import Home from '../pages/home/home.page';
import AllPathsSpecific from '../pages/all-paths/all-paths-specific.page';
import WithAuth from './with-auth.route';

import Nav from '../components/nav/nav.component';
import AllLearningPaths from '../pages/all-learning-paths/all-learning-paths.page';
import ExpandedLearningPath from '../components/learning-paths/expanded-learning-path/expanded-learning-path.component';
import SavedCollections from '../components/learning-paths/saved-collections/saved-collections.component';
import AddCollectionView from '../pages/path-editor-add-collection/path-editor-add-collection.page';
import pathEditorReducer, { defaultState as pathEditorDefaultState } from '../reducers/path-editor';
import PathEditorContext from '../contexts/path-editor-context';

const Main = () => {
  const [loggedInUser, setLoggedInUser] = useState('');

  const [pathEditorState, collectionDispatch] = useReducer(pathEditorReducer, pathEditorDefaultState);

  useEffect(() => {
    if (document.cookie.includes('null')) return;
    fetch('/api/checkToken')
      .then((resp) => resp.json())
      .then((data) => setLoggedInUser(data.userId));
  });
  return (
    <PathEditorContext.Provider
      value={{
        dispatch: collectionDispatch,
        chosenCollections: pathEditorState.chosenCollections,
        pathName: pathEditorState.pathName,
      }}
    >
      <Router>
        <Nav loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
        <main>
          <Switch>
            <Route path="/all-paths">
              <AllPathsSpecific />
            </Route>

            <Route path="/register">
              <Register setLoggedInUser={setLoggedInUser} />
            </Route>

            <Route path="/login">
              <Login setLoggedInUser={setLoggedInUser} />
            </Route>

            <Route path="/settings">
              {/* To protect a route, simply wrap it with a WithAuth component */}
              <WithAuth Component={Settings} />
            </Route>

            {/* change url to fetch learning path */}
            <Route path="/userpaths/user/:userId">
              <AllLearningPaths userPaths loggedInUser={loggedInUser} />
            </Route>
            {/* change url to fetch learning path */}
            <Route path="/userpaths/:id">
              <ExpandedLearningPath loggedInUser={loggedInUser} />
            </Route>

            <Route path="/savedcollections">
              <SavedCollections loggedInUser={loggedInUser} />
            </Route>

            <Route path="/all-paths" exact>
              <AllLearningPaths loggedInUser={loggedInUser} />
            </Route>

            <Route path="/my-paths" exact>
              <WithAuth Component={MyPaths} />
            </Route>

            <Route path="/path-viewer" exact>
              <WithAuth Component={PathViewer} />
            </Route>

            <Route path="/path-editor/add-collection">
              <AddCollectionView />
            </Route>

            <Route path="/path-editor">
              <WithAuth Component={PathEditor} loggedInUser={loggedInUser} userInfoPassThrough />
            </Route>

            <Route path="/collection-editor">
              <CollectionForm />
            </Route>

            <Route path="/" exact>
              <Home loggedInUser={loggedInUser} />
            </Route>

            <Route path="/">
              <NotFound />
            </Route>
          </Switch>
        </main>
      </Router>
    </PathEditorContext.Provider>
  );
};

export default Main;
