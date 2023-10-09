import React, { useState } from 'react';
import './Header.css';
import musicFile from './Music/music.mp3';

function Header() {
    const [audio] = useState(new Audio(musicFile));
    const [isPlaying, setIsPlaying] = useState(false);

    const playMusic = () => {
        audio.play();
        setIsPlaying(true);
    };

    const pauseMusic = () => {
        audio.pause();
        setIsPlaying(false);
    };

    const stopMusic = () => {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
    };

    return (
        <header className="app-header">
            <h1 className="site-name">Study Helper</h1>
            <div className="auth-buttons">
                {isPlaying ? (
                    <>
                    <button className="music-button" onClick={pauseMusic}>
                        Pause
                    </button>
                    <button className="music-button" onClick={stopMusic}>
                        Stop
                    </button>
                    </>
                    ) : (
                        <button className="music-button" onClick={playMusic}>
                            Play Music
                        </button>
                        )}
                <button className="login-button">Log In</button>
                <button className="register-button">Register</button>
            </div>
        </header>
        );
}

export default Header;
