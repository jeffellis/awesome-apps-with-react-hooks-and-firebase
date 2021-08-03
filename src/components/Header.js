import React from "react";
import { withRouter, NavLink } from 'react-router-dom';

function Header() {
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
        <div className="divider"></div>
        <NavLink className="header-link" to="/top">
          top
        </NavLink>
        <div className="divider"></div>
        <NavLink className="header-link" to="/search">
          search
        </NavLink>
        <div className="divider"></div>
        <NavLink className="header-link" to="/create">
          submit
        </NavLink>
        <div className="divider"></div>
      </div>
      <div className="flex">
      <NavLink className="header-link" to="/login">
          login
        </NavLink>
      </div>
    </div>
  );
}

export default withRouter(Header);
