// Weather.js
import React, { useState, useEffect } from 'react';
import './Weather.css'; // Import the CSS file
import SunnyIcon from './Logos/sunny-icon.png'; // Import a custom sunny icon
import RainyIcon from './Logos/rainy-icon.png'; // Import a custom rainy icon
import WindyIcon from './Logos/windy-icon.webp'; // Import a custom windy icon

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
    const location = 'Ljubljana'; // Replace with your desired location

    useEffect(() => {
        // Function to fetch weather data
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
                    );

                if (response.ok) {
                    const data = await response.json();
                    setWeatherData(data);
                } else {
                    console.error('Error fetching weather data');
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
        }, [apiKey, location]);

    // Function to get the appropriate weather icon based on the weather condition
    const getWeatherIcon = (condition) => {
        if (condition.includes('rain')) {
            return RainyIcon;
        } else if (condition.includes('wind')) {
            return WindyIcon;
        } else {
            return SunnyIcon;
        }
    };

    return (
        <div className="weather-widget">
            {weatherData && (
                <>
                <img src={getWeatherIcon(weatherData.weather[0].description)} alt="Weather Icon" />
                <h2>Weather in {location}</h2>
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Weather: {weatherData.weather[0].description}</p>
                <p>Wind: {weatherData.wind.speed} m/s</p>
                </>
                )}
        </div>
        );
};

export default Weather;
