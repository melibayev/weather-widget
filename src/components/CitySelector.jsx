import React, { useState, useEffect, useRef } from 'react';
import { debounce } from '../utils/debounce';
import { MdLocationPin } from "react-icons/md";
import styles from '../styles/CitySelector.module.scss'

const cities = ['Tashkent', 'London', 'New York', 'Tokyo', 'Sydney', 'Cairo'];

const CitySelector = ({ dispatch }) => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(cities);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // filtering cities
  useEffect(() => {
    const handler = debounce(() => {
      const results = cities.filter(city =>
        city.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(results);
    }, 300);
    handler();
  }, [search]);

  // closing dropdown
  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const handleSelect = (city) => {
    setSearch(city);
    setIsOpen(false);
    dispatch({ type: 'CHANGE_CITY', payload: city });
  };

  return (
    <div className={styles['city-selector']} ref={dropdownRef}>
      <MdLocationPin />
      <input
        type="text"
        value={search}
        placeholder="Select or search city..."
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
      />
      {isOpen && (
        <ul className={styles['dropdown']}>
          {filtered.length === 0 ? (
            <li className="disabled">No cities found</li>
          ) : (
            filtered.map((city, index) => (
              <li key={index} onClick={() => handleSelect(city)}>
                {city}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default CitySelector;
