import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  // Fetch weather for the default city when the component mounts
  useEffect(() => {
    getWeather(); // Fetch weather data for the initial city
  }, []); // Empty dependency array to run once on mount

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=d0bf2bf1b53e40828a454408242210&q=${city}&aqi=no`
      );
      setWeather(response.data);
      console.log(response.data); // Check the response in the console
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null); // Reset weather state in case of an error
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    getWeather(); // Fetch weather for the input city
  };

  const getWeatherClass = () => {
    if (!weather) return 'default-weather';
    const condition = weather.current.condition.text.toLowerCase();
    if (condition.includes('sunny') || condition.includes('clear')) return 'sunny';
    if (condition.includes('rain') || condition.includes('showers')) return 'rainy';
    // Add more conditions as needed for different backgrounds
    return 'default-weather';
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <div className="weather-card">
        <input 
          type="text" 
          value={city} 
          onChange={handleCityChange} 
          placeholder="Enter city name" 
        />
        <button onClick={handleSearch}>Search</button>

        {/* Conditional rendering for weather info */}
        {weather && (
          <div className={`weather-info ${getWeatherClass()}`}>
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <p>Temperature: {weather.current.temp_c}°C / {weather.current.temp_f}°F</p>
            <p>Condition: {weather.current.condition.text}</p>
            <p>Wind Speed: {weather.current.wind_kph} kph</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Last Updated: {weather.current.last_updated}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
