import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const styles = {
    light: {
      backgroundColor: '#f8f9fa',
      color: '#212529',
      accent: '#0d6efd',
      backgroundImage:
      "url('https://www.pixelstalk.net/wp-content/uploads/2016/07/Download-Free-Weather-Background.jpg')",
    },
    dark: {
      backgroundColor: '#212529',
      color: '#f8f9fa',
      accent: '#0d6efd',
      backgroundImage:
      "url('https://4kwallpapers.com/images/wallpapers/cumulus-clouds-storm-dark-clouds-sun-light-extreme-weather-3440x1440-3609.jpg')",
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, styles }}>
      {children}
    </ThemeContext.Provider>
  );
};
