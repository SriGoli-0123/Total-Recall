import React, { useState, useEffect } from 'react';
import './PatternUnlockGame.css';

const PatternUnlockGame = ({ onGameOver }) => {
    const [sequence, setSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [level, setLevel] = useState(1);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        startNewLevel();
    }, [level]);

    const startNewLevel = () => {
        const newSequence = generatePatternSequence(level);
        setSequence(newSequence);
        setPlayerSequence([]);
        setIsPlayerTurn(false);
        playSequence(newSequence);
    };

    const generatePatternSequence = (level) => {
        const sequence = [];
        for (let i = 0; i < level + 2; i++) {
            sequence.push(Math.floor(Math.random() * 9)); // 9 possible dots in a 3x3 grid
        }
        return sequence;
    };

    const playSequence = (sequence) => {
        setTimeout(() => {
            setIsPlayerTurn(true);
        }, sequence.length * 1000);
    };

    const handlePlayerClick = (index) => {
        if (!isPlayerTurn) return;

        const newPlayerSequence = [...playerSequence, index];
        setPlayerSequence(newPlayerSequence);

        if (sequence[newPlayerSequence.length - 1] !== index) {
            setGameOver(true);
            setTimeout(() => {
                onGameOver(level - 1);
            }, 2000);
        } else if (newPlayerSequence.length === sequence.length) {
            setLevel(level + 1);
        }
    };

    return (
        <div className="unlock-container">
            <div className={`unlock-grid ${gameOver ? 'shake' : ''}`}>
                {[...Array(9)].map((_, index) => (
                    <div
                        key={index}
                        className={`unlock-dot ${playerSequence.includes(index) ? 'active' : ''}`}
                        onClick={() => handlePlayerClick(index)}
                    ></div>
                ))}
            </div>
            {gameOver && <div className="game-over">Game Over</div>}
        </div>
    );
};

export default PatternUnlockGame;
