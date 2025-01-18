import React, { useEffect, useState } from "react";
import axios from "axios";


const baseUrl = "http://api.weatherapi.com/v1";
// const apiKey = "dee80da1e6d6ca2dc0cec74ec04d5389";
const endpoint = "/current.json";
const apiKey = "8864d2ae33bd46899c4205848251801";

const url = `${baseUrl}${endpoint}`;

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords = `${latitude},${longitude}`;
        const request_url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${coords}`;
        // Fetch weather data
        axios
          .get(request_url)
          .then((response) => {
            setWeather(response.data);
            console.log(response.data);
          })
          .catch((err) => {
            setError("Failed to fetch weather data");
          });
      },
      () => {
        setError("Location access denied");
      }
    );
  }, []);

  if (error) return <div>{error}</div>;
  if (!weather) return <div>Loading weather...</div>;

  return (
    <div style={{ padding: "16px", textAlign: "left" }}>
      <h3>Current Weather</h3>
      <p><strong>Location:</strong> {weather.location.name}</p>
      <p><strong>Temperature:</strong> {weather.current.temp_c}°C</p>
      <p><strong>Condition:</strong> {weather.current.condition.text}</p>
    </div>
  );
};

export default Weather;
