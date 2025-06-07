import React from 'react';
import styles from '../styles/SettingsPanel.module.scss';

const SettingsPanel = ({ state, dispatch }) => {
  const handleUnitChange = (unit) => {
    if (state.unit !== unit) {
      dispatch({ type: 'TOGGLE_UNIT' });
    }
  };

  return (
    <div className={styles['settings-panel']}>
      <button
        className={state.unit === 'metric' ? styles.active : ''}
        onClick={() => handleUnitChange('metric')}
      >
        °C
      </button>
      <button
        className={state.unit === 'imperial' ? styles.active : ''}
        onClick={() => handleUnitChange('imperial')}
      >
        °F
      </button>
    </div>
  );
};

export default SettingsPanel;
