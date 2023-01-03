import React, { useState } from 'react';
import axios from 'axios';

import './App.css';

export default function App() {
  const [city, setCity] = useState(' ');
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function showWeather(response) {
    setLoaded(true);
    console.log(response.data);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });

    console.log(response.data);
  }

  function searchButton(event) {
    event.preventDefault();
    let apiKey = '094780c710fa4efd669f0df8c3991927';
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    //console.log(apiURL);
    axios.get(apiURL).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={searchButton} class="search-form">
      <input
        type="search"
        placeholder="Enter a city.."
        onChange={updateCity}
        class="city-input"
      />
      <button type="submit" class="search-button">
        Search
      </button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <div class="weather-data">
          <ul class="weather-list">
            <li>
              Temperature: <strong>{Math.round(weather.temperature)}°C</strong>
            </li>
            <li>
              Description:{' '}
              <strong class="description">{weather.description}</strong>
            </li>
            <li>
              Humidity: <strong>{weather.humidity} % </strong>
            </li>
            <li>
              Wind: <strong>{weather.wind} km/h </strong>
            </li>
          </ul>
          <img src={weather.icon} alt={weather.description} />
        </div>
      </div>
    );
  } else {
    return form;
  }
}
