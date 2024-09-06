import React from 'react';
import './Header.css';

const Header = ({ score }) => {
    return (
        <header className="header">
            <h1>Memory Sequence Game</h1>
            <div className="score">Score: {score}</div>
        </header>
    );
};

export default Header;
