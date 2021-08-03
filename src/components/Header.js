import React, { useContext } from "react";
import { withRouter, NavLink } from 'react-router-dom';
import {FirebaseContext} from '../firebase/index'

function Divider() {
  return <div className="divider">|</div>
}

function Header() {
  const { user, firebase } = useContext(FirebaseContext);
  return (
    <div className="header">
      <div className="flex">
        <img  className="logo" src="/logo.png" alt="Hooks News Logo" />
        <NavLink className="header-title" to="/">
          Hooks News
        </NavLink>
        <NavLink className="header-link" to="/">
          new
        </NavLink>
        <Divider/>
        <NavLink className="header-link" to="/top">
          top
        </NavLink>
        <Divider/>
        <NavLink className="header-link" to="/search">
          search
        </NavLink>
        { user && (
          <>
            <Divider/>
            <NavLink className="header-link" to="/create">
              submit
            </NavLink>
          </>
        )}
      </div>
      <div className="flex">
        { 
          user ? (
            <>
              <div className="header-name">{user.displayName}</div>
              <Divider/>            
              <div className="header-button" onClick={ () => firebase.logout() }>logout</div>
            </>
          ) 
          :
            <NavLink className="header-link" to="/login">
              login
            </NavLink>
        }
      </div>
    </div>
  );
}

export default withRouter(Header);
