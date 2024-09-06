import React, { useState, useEffect } from 'react';
import SequencePattern from './SequencePattern';
import './GameBoard.css';

const patterns = [1, 2, 3, 4]; // Represent different patterns

const GameBoard = ({ setScore }) => {
    const [sequence, setSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [level, setLevel] = useState(1);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [activePattern, setActivePattern] = useState(null);
    const [scoreEntries, setScoreEntries] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        startNewLevel();
    }, [level]);

    const startNewLevel = () => {
        const newSequence = [...sequence, patterns[Math.floor(Math.random() * patterns.length)]];
        setSequence(newSequence);
        setPlayerSequence([]);
        setIsPlayerTurn(false);

        playSequence(newSequence);
    };

    const playSequence = (sequence) => {
        sequence.forEach((pattern, index) => {
            setTimeout(() => {
                highlightPattern(pattern);
            }, (index + 1) * 1000);
        });

        setTimeout(() => {
            setIsPlayerTurn(true);
        }, sequence.length * 1000 + 500);
    };

    const highlightPattern = (pattern) => {
        setActivePattern(pattern);
        setTimeout(() => {
            setActivePattern(null);
        }, 500);
    };

    const handlePlayerClick = (pattern) => {
        if (!isPlayerTurn) return;

        const newPlayerSequence = [...playerSequence, pattern];
        setPlayerSequence(newPlayerSequence);

        if (sequence[newPlayerSequence.length - 1] !== pattern) {
            setGameOver(true);
            setTimeout(() => {
                resetGame();
            }, 2000); // Delay before resetting
        } else if (newPlayerSequence.length === sequence.length) {
            setScore(level);
            setScoreEntries([...scoreEntries, '✔️']);
            setLevel(level + 1);
        }
    };

    const resetGame = () => {
        setSequence([]);
        setPlayerSequence([]);
        setLevel(1);
        setScore(0);
        setScoreEntries([]);
        setIsPlayerTurn(false);
        setGameOver(false);
    };

    return (
        <div className="game-container">
            <div className={`game-board ${gameOver ? 'shake' : ''}`}>
                {patterns.map((pattern, index) => (
                    <SequencePattern
                        key={index}
                        pattern={pattern}
                        isActive={activePattern === pattern}
                        onClick={() => handlePlayerClick(pattern)}
                    />
                ))}
            </div>
            <div className="score-board">
                {gameOver ? (
                    <div className="game-over">Game Over</div>
                ) : (
                    scoreEntries.map((entry, index) => (
                        <span key={index} className="score-entry">{entry}</span>
                    ))
                )}
            </div>
        </div>
    );
};

export default GameBoard;
