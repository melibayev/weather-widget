import React from 'react';
import WeatherWidget from './components/WeatherWidget';
import { ThemeProvider } from './context/ThemeContext';

const AppContent = () => {

  return (
    <div className='main'>
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
