import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/DataVisualization.module.scss';

const DataVisualization = ({ data, unit }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(400);  // default width
  const height = 250;
  const margin = 50;

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    }

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  if (!data || !data.list || data.list.length === 0) return <p>Loading chart...</p>;

  const today = new Date().toISOString().split('T')[0];
  const allToday = data.list.filter(item => item.dt_txt.startsWith(today));

  let selectedEntries = [...allToday];
  if (selectedEntries.length < 4) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    const allTomorrow = data.list.filter(item => item.dt_txt.startsWith(tomorrowStr));
    const remainingNeeded = 4 - selectedEntries.length;
    selectedEntries = [...selectedEntries, ...allTomorrow.slice(0, remainingNeeded)];
  }

  if (selectedEntries.length < 2) return <p>Not enough data for chart</p>;

  const temps = selectedEntries.map(e => e.main.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = maxTemp - minTemp || 1;

  // Calculate points relative to responsive width
  const points = selectedEntries.map((e, i) => {
    const temp = e.main.temp;
    const hour = new Date(e.dt_txt).getHours();

    const x = (i / (selectedEntries.length - 1)) * (width - margin * 2) + margin;
    const y = height - margin - ((temp - minTemp) / tempRange) * (height - margin * 2);

    return { x, y, temp, hour };
  });

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <svg
        className={styles['data-container']}
        width={width}
        height={height}
      >
        {/* Top-left label */}
        <text x={10} y={20} fontSize="14" fill="#333">
          Today’s Temp: {selectedEntries[0].main.temp.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}
        </text>

        {/* Hour labels on X axis */}
        {points.map((pt, i) => (
          <text
            key={`h-${i}`}
            x={pt.x}
            y={height - margin + 15}
            fontSize="10"
            fill="#666"
            textAnchor="middle"
          >
            {pt.hour}:00
          </text>
        ))}

        {/* Y-axis temperature labels */}
        {[0, 1, 2, 3, 4, 5].map(step => {
          const tempValue = minTemp + (tempRange / 5) * step;
          const y = height - margin - (step / 5) * (height - margin * 2);
          return (
            <text
              key={`y-label-${step}`}
              x={5}
              y={y + 4}
              fontSize="10"
              fill="#666"
            >
              {tempValue.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}
            </text>
          );
        })}

        {/* Line */}
        <polyline
          fill="none"
          stroke="#0d6efd"
          strokeWidth="2"
          points={points.map(pt => `${pt.x},${pt.y}`).join(' ')}
        />

        {/* Dots */}
        {points.map((pt, i) => (
          <circle key={`c-${i}`} cx={pt.x} cy={pt.y} r={4} fill="#0d6efd" />
        ))}

        {/* Temperature labels near dots */}
        {points.map((pt, i) => (
          <text
            key={`temp-label-${i}`}
            x={pt.x + 10}
            y={pt.y + 4}
            fontSize="10"
            fill="#333"
          >
            {pt.temp.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default DataVisualization;
