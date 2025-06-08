import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getWeatherSummary } from '../utils/aiHelper';

import styles from '../styles/WeatherDisplay.module.scss';

const WeatherDisplay = ({ state }) => {
  const weather = state.displayData?.list[0];
  const cityName = state.displayData?.city?.name;
  const countryCode = state.displayData?.city?.country;
  
  // finding current time of city
  const timezoneOffset = state.displayData?.city?.timezone;
  const utcTimestamp = Date.now() + new Date().getTimezoneOffset() * 60000;
  const localTime = new Date(utcTimestamp + timezoneOffset * 1000);
  const formattedTime = localTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const [weatherSummary, setWeatherSummary] = useState('');

  // making summary of weather using gemini
  useEffect(() => {
    async function fetchSummary() {
      const prompt = `without greetings just give a friendly, and short 2-line weather summary for ${cityName}, ${countryCode}. The weather is ${weather?.weather[0].description}, temperature is ${weather?.main.temp}°, feels like ${weather?.main.feels_like}°
      expecting rain or sun and give advice for people. and at the and use some emojis`;
      const summary = await getWeatherSummary(prompt);
      setWeatherSummary(summary);
    }

    if (cityName && weather) {
      fetchSummary();
    }
  }, [cityName, countryCode, weather, state.unit]);

  if (!weather) {
    return (
      <div className={styles['weather-display']}>
        <Skeleton enableAnimation baseColor='rgba(256,256,256, 0.5)' highlightColor='rgba(255,255,255, 0.1)' height={30} width={200}/>
        <Skeleton enableAnimation baseColor='rgba(256,256,256, 0.5)' highlightColor='rgba(255,255,255, 0.1)' count={3}/>
        <Skeleton enableAnimation baseColor='rgba(256,256,256, 0.5)' highlightColor='rgba(255,255,255, 0.1)' height={480} borderRadius={20} />
      </div>
    );
  }

  const { temp, feels_like, humidity, pressure } = weather.main;
  const wind = weather.wind.speed;
  const description = weather.weather[0].description;
  const rainChance = weather.pop !== undefined ? `${Math.round(weather.pop * 100)}%` : 'N/A';
  const pressureInInches = (pressure * 0.02953).toFixed(1);
  const visibilityMiles = (weather.visibility / 1609.34).toFixed(1);

  return (
    <div className={styles['weather-display']}>
      <div className={styles['weather-display-city']}>
      <h4>{cityName}, {countryCode}</h4>
      <p>{formattedTime}</p>
      </div>
      <div className={styles['weather-display-temp']}>
        <p className={styles['weather-display-temp']}>{temp.toFixed(1)}°{state.unit === 'metric' ? 'C' : 'F'}</p>
        <span>Feels like {feels_like.toFixed(1)}°{state.unit === 'metric' ? 'C' : 'F'}</span>
      </div>
      <h4 className={styles['weather-display-description']}>{description}</h4>
      {weatherSummary && (
        <div className={styles['weather-display-summary']}>
          <p>{weatherSummary}</p>
        </div>
      )}
      <div className={styles['weather-display-info']}>
        <div>
          <div>
            <img src="https://climeradar.com/icons/info-chance.svg" alt="" />
            <span>Rain Chance</span>
          </div>
          <p>{rainChance}</p>
        </div>
        <div>
          <div>
            <img src="https://climeradar.com/icons/info-pressure.svg" alt="" />
            <span>Rain Chance</span>
          </div>
          <p>{pressureInInches} in</p>
        </div>
        <div>
          <div>
            <img src="https://climeradar.com/icons/info-visibility.svg" alt="" />
            <span>Rain Chance</span>
          </div>
          <p>{visibilityMiles} mi</p>
        </div>
        <div>
          <div>
            <img src="https://climeradar.com/icons/summary-wind.svg" alt="" />
            <span>Rain Chance</span>
          </div>
          <p>{state.unit === 'metric' ? `${wind} m/s` : `${wind.toFixed(1)} mph`}</p>
        </div>
      </div>
      <h2>Humidity</h2>
      <div className={styles['weather-display-humidity']}>
        <div className={styles['weather-display-humidity-progress']}>
          <span className={styles['weather-display-humidity-progress-active']}></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>{humidity}%</p>
      </div>
      <div className={styles['weather-display-humidity-lvl']}>
        <div>
          <p>Safe</p>
          <div className={styles['weather-display-humidity-lvl-info']}>
            <span className={styles['safe']}></span>
            <p>0.00% - 0.9%</p>
          </div>
          <div className={styles['weather-display-humidity-lvl-info']}>
            <span className={styles['safe-1']}></span>
            <p>0.9% - 11%</p>
          </div>
        </div>
        <div>
          <p>Dangerous</p>
          <div className={styles['weather-display-humidity-lvl-info']}>
            <span className={styles['dangerous']}></span>
            <p>12% - 38%</p>
          </div>
          <div className={styles['weather-display-humidity-lvl-info']}>
            <span className={styles['dangerous-1']}></span>
            <p>39% - 90%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
