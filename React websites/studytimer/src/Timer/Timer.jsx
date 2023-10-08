import React, { useState, useEffect } from 'react';
import './Timer.css'; // Import your CSS file

function Timer() {
    const [timeLeft, setTimeLeft] = useState(1500); // Initial time in seconds (25 minutes)
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timer;

        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
                }, 1000);
        } else if (timeLeft === 0) {
            // Handle session end (e.g., play a sound or show a notification)
            // You can add this logic here
            setIsActive(false);
        }

        return () => clearInterval(timer);
        }, [isActive, timeLeft]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const startTimer = () => {
        setIsActive(true);
    };

    const pauseTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(1500); // Reset to 25 minutes
    };

    return (
        <div className="timer-container">
            <div className={`timer ${isActive ? 'active' : ''}`}>
                {formatTime(timeLeft)}
            </div>
            <div className="button-container">
                <button onClick={startTimer}>Start</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
        );
}

export default Timer;
