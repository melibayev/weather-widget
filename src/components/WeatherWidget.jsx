import React from 'react';
import CitySelector from './CitySelector';
import WeatherDisplay from './WeatherDisplay';
import ForecastList from './ForecastList';
import DataVisualization from './DataVisualization';
import SettingsPanel from './SettingsPanel';
import ErrorBoundary from './ErrorBoundary';
import { useWeatherData } from '../hooks/useWeatherData';
import { useIsMobile } from '../hooks/useIsMobile'; 

import styles from '../styles/WeatherWidget.module.scss'
import ThemeChange from './ThemeChange';
import WeatherMap from './WeatherMap';


const WeatherWidget = () => {
  const { state, dispatch } = useWeatherData();
  const isMobile = useIsMobile();
  return (
    <ErrorBoundary>
      <div className={styles['weather-widget']}>
        <div className={styles['weather-widget-container']}>
          <div className={styles['weather-widget-aside']}>
            <CitySelector dispatch={dispatch} />
            {isMobile && (
              <div className={styles['mobile-settings']}>
                <SettingsPanel state={state} dispatch={dispatch} />
                <ThemeChange />
              </div>
              )}
            <WeatherDisplay state={state} />
            </div>
          <div className={styles['weather-widget-info']}>
            {!isMobile && (
              <div className={styles['weather-widget-info-settings']}>
                <SettingsPanel state={state} dispatch={dispatch} />
                <ThemeChange />
              </div>
            )}
            <div className={styles['weather-widget-info-stats']}>
              <DataVisualization data={state.displayData} unit={state.unit} />
              <WeatherMap state={state} /> 
            </div>
            <ForecastList data={state.displayData} unit={state.unit} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default WeatherWidget;
