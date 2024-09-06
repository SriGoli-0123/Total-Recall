import React from 'react';
import './SequencePattern.css';

const SequencePattern = ({ pattern, onClick, isActive }) => {
    return (
        <div
            className={`sequence-pattern pattern-${pattern} ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
        </div>
    );
};

export default SequencePattern;
