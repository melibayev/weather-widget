import React, { useContext } from 'react';
import WeatherWidget from './components/WeatherWidget';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

const AppContent = () => {
  const { theme, styles } = useContext(ThemeContext);
  const currentStyle = styles[theme];

  return (
    <div style={{ 
      backgroundColor: currentStyle.backgroundColor,
      color: currentStyle.color, 
      minHeight: '100vh', 
      padding: '10px',
      backgroundImage: currentStyle.backgroundImage,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
       }}>
      <WeatherWidget />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
