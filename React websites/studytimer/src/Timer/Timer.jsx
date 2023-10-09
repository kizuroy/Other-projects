import React, { useState, useEffect } from 'react';
import './Timer.css';

function Timer() {
    const [sessionLength, setSessionLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [longBreakLength, setLongBreakLength] = useState(15);
    const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(4);
    const [isSessionActive, setIsSessionActive] = useState(true);
    const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
    const [timerActive, setTimerActive] = useState(false);
    const [completedSessions, setCompletedSessions] = useState(0);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        let interval;

        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
                }, 1000);
        } else if (timeLeft === 0) {
            handleSessionEnd();
        }

        return () => clearInterval(interval);
        }, [timerActive, timeLeft]);

    useEffect(() => {
        if (!timerActive && timeLeft === 0) {
            setCompletedSessions((prevCompletedSessions) => prevCompletedSessions + 1);
            handleSessionEnd();
        }
    }, [timerActive, timeLeft]);

    const handleSessionEnd = () => {
        setIsSessionActive((prevIsSessionActive) => !prevIsSessionActive);

        if (completedSessions === sessionsBeforeLongBreak - 1) {
            // After specified work sessions, take a long break
            setTimeLeft(longBreakLength * 60);
            setCompletedSessions(0);
        } else {
            // Otherwise, take a short break
            setTimeLeft(breakLength * 60);
            setCompletedSessions((prevCompletedSessions) => prevCompletedSessions + 1);
        }
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const toggleTimer = () => {
        setTimerActive((prevTimerActive) => !prevTimerActive);
    };

    const resetTimer = () => {
        setTimerActive(false);
        setIsSessionActive(true);
        setTimeLeft(sessionLength * 60);
        setCompletedSessions(0);
    };

    const toggleSettings = () => {
        setShowSettings((prevShowSettings) => !prevShowSettings);
    };

    return (
        <div className="timer-container">
            <h1 className="timer-title">Pomodoro Timer</h1>
            <div className={`timer ${isSessionActive ? 'session' : 'break'}`}>
                {isSessionActive ? 'Study Time' : 'Break Time'}: {formatTime(timeLeft)}
            </div>
            <div className="controls">
                <button className={`control-button ${timerActive ? 'pause-button' : 'start-button'}`} onClick={toggleTimer}>
                    {timerActive ? 'Pause' : 'Start'}
                </button>
                <button className="control-button reset-button" onClick={resetTimer}>
                    Reset
                </button>
                <button className="control-button settings-button" onClick={toggleSettings}>
                    Settings
                </button>
            </div>
            {showSettings && (
                <div className="settings">
                    <label className="setting-label">Session Length (minutes):</label>
                    <input
                        type="number"
                        min="1"
                        className="setting-input"
                        value={sessionLength}
                        onChange={(e) => setSessionLength(e.target.value)}
                    />
                    <label className="setting-label">Break Length (minutes):</label>
                    <input
                        type="number"
                        min="1"
                        className="setting-input"
                        value={breakLength}
                        onChange={(e) => setBreakLength(e.target.value)}
                    />
                    <label className="setting-label">Long Break Length (minutes):</label>
                    <input
                        type="number"
                        min="1"
                        className="setting-input"
                        value={longBreakLength}
                        onChange={(e) => setLongBreakLength(e.target.value)}
                    />
                    <label className="setting-label">Sessions Before Long Break:</label>
                    <input
                        type="number"
                        min="1"
                        className="setting-input"
                        value={sessionsBeforeLongBreak}
                        onChange={(e) => setSessionsBeforeLongBreak(e.target.value)}
                    />
                </div>
                )}
            <div className="completed-sessions">
                Completed Sessions: {completedSessions}
            </div>
        </div>
        );
}

export default Timer;

