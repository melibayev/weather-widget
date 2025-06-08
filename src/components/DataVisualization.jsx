import React, { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from '../styles/DataVisualization.module.scss';

const DataVisualization = ({ data, unit }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(400); 
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

  if (!data || !data.list || data.list.length === 0) {
    return (
      <div>
        <Skeleton enableAnimation baseColor='rgba(256,256,256, 0.5)' highlightColor='rgba(255,255,255, 0.1)' height={240} borderRadius={20} />
      </div>
    );
  }
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

  // to make the card responsive
  const points = selectedEntries.map((e, i) => {
    const temp = e.main.temp;
    const hour = new Date(e.dt_txt).getHours();

    const x = (i / (selectedEntries.length - 1)) * (width - margin * 2) + margin;
    const y = height - margin - ((temp - minTemp) / tempRange) * (height - margin * 2);

    return { x, y, temp, hour };
  });

  return (
    <div ref={containerRef}>
      <svg
        className={styles['data-container']}
        width={width}
        height={height}
      >
        {/* top-left label */}
        <text x={10} y={20} fontSize="14">
          Today’s Temp: {selectedEntries[0].main.temp.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}
        </text>

        {/* hour labels on X axis */}
        {points.map((pt, i) => (
          <text
            key={`h-${i}`}
            x={pt.x}
            y={height - margin + 15}
            fontSize="10"
            textAnchor="middle"
          >
            {pt.hour}:00
          </text>
        ))}

        {/* y-axis temperature labels */}
        {[0, 1, 2, 3, 4, 5].map(step => {
          const tempValue = minTemp + (tempRange / 5) * step;
          const y = height - margin - (step / 5) * (height - margin * 2);
          return (
            <text
              key={`y-label-${step}`}
              x={5}
              y={y + 4}
              fontSize="10"
            >
              {tempValue.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}
            </text>
          );
        })}

        {/* line */}
        <polyline
          strokeWidth="2"
          points={points.map(pt => `${pt.x},${pt.y}`).join(' ')}
        />

        {/* dots */}
        {points.map((pt, i) => (
          <circle key={`c-${i}`} cx={pt.x} cy={pt.y} r={4} />
        ))}

        {/* temperature labels near dots */}
        {points.map((pt, i) => (
          <text
            key={`temp-label-${i}`}
            x={pt.x + 10}
            y={pt.y + 4}
            fontSize="10"
          >
            {pt.temp.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default DataVisualization;
