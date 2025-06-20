![Weather Widget](https://github.com/melibayev/weather-widget/blob/main/src/assets/image/demo-light.png)
# 🌦️ Weather App

## 🚀 Features

- 🌍 **City Selection** — Search and view weather data for any city
- ☀️ **Live Weather Display** — Real-time temperature, humidity, wind, etc.
- 📊 **Data Visualization** — Beautiful graphs to show key weather stats
- 🗺️ **Weather Map Integration** — View geographic data visually
- 📆 **Forecast Scrolling UI** — Horizontally scrollable future forecasts
- 🌓 **Theme Switcher** — Light/Dark mode with context-based styling
- 📱 **Responsive Design** — Adapts layout and components for mobile screens
- ⚙️ **Settings Panel** — Configure units (°C/°F) and more

## 🧑‍💻 Technologies Used

- **React** with Hooks & Context API  
- **SCSS Modules** for scoped, responsive styles  
- **Custom Hooks** for weather fetching and mobile responsiveness  
- **OpenWeatherMap API** (or your chosen weather API)  
- **Responsive Layouts** with CSS Grid and Flexbox  

## 🛠️ Setup & Installation

1. **Clone the repository:**

```bash
git clone https://github.com/melibayev/weather-widget.git
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Configure API keys:
```bash
REACT_APP_WEATHER_API_KEY=your_openweather_api_key
REACT_APP_GEMINI_API_KEY=your_gemini_api_key

//if you do not have api keys, you can use these for testing:
REACT_APP_OWM_API_KEY=eb131c2c754fff81f7bcb44d0470aaa6
REACT_APP_GEMINI_API_KEY=AIzaSyCJrBODcPP8GH8Pk7ZhiqoXFwkqBfU0P1k
```
4. Run the app:
```bash
npm start
```
