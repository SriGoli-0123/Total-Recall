import React, { useState } from 'react';
import Header from './components/Header';
import ModeSelection from './components/ModeSelection';
import GameBoard from './components/GameBoard';
import PatternUnlockGame from './components/PatternUnlockGame';
import './App.css';

function App() {
    const [score, setScore] = useState(0);
    const [mode, setMode] = useState(null);

    const handleModeSelect = (selectedMode) => {
        setMode(selectedMode);
    };

    const handleGameOver = (finalScore) => {
        alert(`Game Over! Your final score is: ${finalScore}`);
        setMode(null);
        setScore(0);
    };

    return (
        <div className="App">
            <Header score={score} />
            {!mode && <ModeSelection onSelectMode={handleModeSelect} />}
            {mode === 'patterns' && <GameBoard setScore={setScore} />}
            {mode === 'unlock' && <PatternUnlockGame onGameOver={handleGameOver} />}
        </div>
    );
}

export default App;
