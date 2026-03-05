import React from 'react';
import { useSettings } from '../../Utility/SettingsContext';
import classes from './themeIndicator.module.css';

const ThemeIndicator = () => {
  const { settings, getLanguageName } = useSettings();

  return (
    <div className={classes.theme_indicator}>
      <div className={classes.indicator_item}>
        <span className={classes.indicator_label}>Theme:</span>
        <span 
          className={classes.color_dot} 
          style={{ background: settings.themeColor }}
        ></span>
      </div>
      <div className={classes.indicator_item}>
        <span className={classes.indicator_label}>Lang:</span>
        <span className={classes.indicator_value}>{getLanguageName()}</span>
      </div>
      {settings.darkMode && (
        <div className={classes.indicator_item}>
          <span className={classes.dark_mode_badge}>🌙 Dark</span>
        </div>
      )}
    </div>
  );
};

export default ThemeIndicator;
