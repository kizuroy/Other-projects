import React, { useState, useEffect } from 'react';
import './Header.css';
import musicFile from './Music/music.mp3';

function Header() {
  const [audio] = useState(new Audio(musicFile));
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', stopMusic);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', stopMusic);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    if (!isDragging) {
      setProgress(audio.currentTime / audio.duration);
    }
  };

  const stopMusic = () => {
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setProgress(0);
  };

  const changeTime = (e) => {
    const newTime = e.target.value;
    setProgress(newTime);
    audio.currentTime = newTime * audio.duration;
  };

  const changeVolume = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audio.volume = newVolume;
  };

  return (
    <header className="app-header">
      <h1 className="site-name">Study Helper</h1>
      <div className="auth-buttons">
        <button className="music-button" onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className="music-button" onClick={stopMusic}>
          Stop
        </button>
        <input 
          type="range" 
          value={progress} 
          step="0.01" 
          onMouseDown={() => setIsDragging(true)} 
          onMouseUp={changeTime} 
        />
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={changeVolume} 
        />
        <button className="login-button">Log In</button>
        <button className="register-button">Register</button>
      </div>
    </header>
  );
}

export default Header;
