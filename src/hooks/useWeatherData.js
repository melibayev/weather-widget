import { useReducer, useEffect } from 'react';
import { cToF, fToC } from '../utils/temperature';

const API_KEY = process.env.REACT_APP_OWM_API_KEY;

const initialState = {
  loading: false,
  error: null,
  originalData: null,
  displayData: null, 
  city: 'Tashkent',
  unit: 'metric',
};

function convertData(data, unit) {
  if (!data || unit === 'metric') return data;

  const newList = data.list.map(entry => ({
    ...entry,
    main: {
      ...entry.main,
      temp: cToF(entry.main.temp),
      feels_like: cToF(entry.main.feels_like),
      temp_min: cToF(entry.main.temp_min),
      temp_max: cToF(entry.main.temp_max),
    },
    wind: {
      ...entry.wind,
      speed: entry.wind.speed * 2.237, // m/s → mph
    },
  }));

  return { ...data, list: newList };
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_WEATHER':
      return { ...state, loading: true, error: null };
    case 'SET_DATA':
      return {
        ...state,
        loading: false,
        originalData: action.payload,
        displayData: convertData(action.payload, state.unit),
      };
    case 'TOGGLE_UNIT':
      const newUnit = state.unit === 'metric' ? 'imperial' : 'metric';
      return {
        ...state,
        unit: newUnit,
        displayData: convertData(state.originalData, newUnit),
      };
    case 'CHANGE_CITY':
      return { ...state, city: action.payload, originalData: null, displayData: null };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

async function fetchWeather(city, dispatch) {
  dispatch({ type: 'FETCH_WEATHER' });

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error('City not found or API error');
    const data = await res.json();
    dispatch({ type: 'SET_DATA', payload: data });
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err.message });
  }
}

export function useWeatherData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchWeather(state.city, dispatch);
  }, [state.city]);

  return { state, dispatch };
}
