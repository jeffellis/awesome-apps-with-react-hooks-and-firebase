import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import ForgotPassword from './Auth/ForgotPassword'
import Login from './Auth/Login'
import useAuth from "./Auth/useAuth";
import firebase, { FirebaseContext } from "../firebase";
import CreateLink from './Link/CreateLink';
import Header from './Header';
import LinkList from './Link/LinkList'
import LinkDetail from './Link/LinkDetail'
import SearchLinks from './Link/SearchLinks'

function App() {
  const user = useAuth();
  console.log('Logged in user:', user);

  const firebaseContext = {
    firebase,
    user,
  };

  return (
    <BrowserRouter>
    <FirebaseContext.Provider value={firebaseContext}>
    <div className="app-container" >
      <Header />
      <div className="route-container">
        <Switch>
          <Route exact path='/' render={() => <Redirect to="/new/1" />}/>        
          <Route path="/create" component={CreateLink} />
          <Route path="/login" component={Login} />
          <Route path='/forgot' component={ForgotPassword}/>
          <Route path='/search' component={SearchLinks}/>
          <Route path='/top' component={LinkList}/>
          <Route path='/new/:page' component={LinkList}/>
          <Route path='/link/:linkId' component={LinkDetail}/>        
        </Switch>
      </div>
    </div>
    </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
