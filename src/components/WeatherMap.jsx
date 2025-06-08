import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from '../styles/WeatherMap.module.scss'

const WeatherMap = ({ state, zoom = 6 }) => {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const city = state.displayData?.city?.name;


  useEffect(() => {
    if (!city) return;

    setLoading(true);
    setError(null);

    // fetching coordinates from OpenStreetMap Nominatim API
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setCoords({ lat: data[0].lat, lon: data[0].lon });
        } else {
          setError('City not found');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching coordinates');
        setLoading(false);
      });
  }, [city]);

  if (loading) {
    return (
      <div>
        <Skeleton enableAnimation baseColor='rgba(256,256,256, 0.5)' highlightColor='rgba(255,255,255, 0.1)' height={240} borderRadius={20} />
      </div>
    );
  }
  if (error) return <p>{error}</p>;
  if (!coords.lat || !coords.lon) return <p>Coordinates not available</p>;

  const src = `https://mapa.tutiempo.net/en/#${coords.lat};${coords.lon};${zoom}`;

  return (
    <iframe
      src={src}
      scrolling="no"
      webkitAllowFullScreen
      mozAllowFullScreen
      allowFullScreen
      className={styles['map-container']}
    />
  );
};

export default WeatherMap;
