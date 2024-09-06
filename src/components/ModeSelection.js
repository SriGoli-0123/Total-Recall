import React from 'react';
import './ModeSelection.css';

const ModeSelection = ({ onSelectMode }) => {
    return (
        <div className="mode-selection">
            <h2>Select Game Mode</h2>
            <button onClick={() => onSelectMode('patterns')} className="mode-button">Patterns Game</button>
            <button onClick={() => onSelectMode('unlock')} className="mode-button">Pattern Unlock Game</button>
        </div>
    );
};

export default ModeSelection;
