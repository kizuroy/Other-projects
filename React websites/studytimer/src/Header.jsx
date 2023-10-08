import React from 'react';
import './Header.css';

function Header() {
    return (
        <header className="app-header">
            <h1 className="site-name">Study helper</h1>
            <div className="auth-buttons">
                <button className="login-button">Log In</button>
                <button className="register-button">Register</button>
            </div>
        </header>
        );
}

export default Header;
