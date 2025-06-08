import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaCalendarDays } from "react-icons/fa6";

import styles from '../styles/ForecastList.module.scss'

const getDailyForecast = (list) => {
  const days = {};
  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) {
      days[date] = {
        min: item.main.temp,
        max: item.main.temp,
        icon: item.weather[0].icon,
        desc: item.weather[0].main,
      };
    } else {
      days[date].min = Math.min(days[date].min, item.main.temp);
      days[date].max = Math.max(days[date].max, item.main.temp);
    }
  });

  return Object.entries(days).map(([date, data]) => ({
    date,
    ...data,
  })).slice(0, 5);
};

const ForecastList = ({ data, unit }) => {
  if (!data || !data.list) {
    return (
      <div className={styles['forecast-list']}>
        <Skeleton enableAnimation baseColor='rgba(256,256,256, 0.5)' highlightColor='rgba(255,255,255, 0.1)' height={240} borderRadius={20} />
      </div>
    );
  }
  const forecast = getDailyForecast(data.list);

  return (
    <div className={styles['forecast-list']}>
      <h3><FaCalendarDays /> 5-Day Forecast</h3>
      <div className={styles['forecast-container']}>
        {forecast.map((day, i) => (
          <div key={i} className={styles['forecast-card']}>
            <p><strong>{new Date(day.date).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric'
            })}</strong></p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.desc}
              title={day.desc}
            />
            <p>{day.desc}</p>
            <p>🔺 {day.max.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}</p>
            <p>🔻 {day.min.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
