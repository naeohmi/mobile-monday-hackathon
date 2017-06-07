import React from 'react'; // eslint-disable-next-line
import { BrowserRouter as Route, NavLink, Link } from 'react-router-dom';

export default function Navigation(props) {
    const renderNavigation = () => {
        return (
            <div className="nav-container">
                <div className="logo">
                    <a href="/"><img src="/images/penpal_logo_darkblue.png" alt="Logo" /></a>
                </div>
                <nav className="nav">
                    <ul className="nav-ul">
                        <li className="nav-li"><Link to="/">home</Link></li>
                        <li className="nav-li"><NavLink to="/chat">chat</NavLink></li>
                        <li className="nav-li"><NavLink to="/dashboard">dashboard</NavLink></li>
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