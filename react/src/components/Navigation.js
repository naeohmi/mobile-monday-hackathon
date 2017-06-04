import React, { Component } from 'react';
import { BrowserRouter as Route, NavLink, Link } from 'react-router-dom';

export default function Navigation(props){
    const renderNavigation = () => {
        return (
            <div className="nav-container">
        <div className="logo">
          <a href="/"><img src="/images/logo.png" alt="Logo" /></a>
        </div>
    	  <nav className="nav">
    	     <ul className="nav-ul">
    	       <li className="nav-li"><Link to="/">Home</Link></li>
    	       <li className="nav-li"><NavLink to="/chat">Chat</NavLink></li>
    	       <li className="nav-li"><NavLink to="/dashboard">Dashboard</NavLink></li>
          </ul>
    	  </nav>
	    </div>
        );
    }

    return (
        <div>
            {renderNavigation()}
        </div>
    );
}