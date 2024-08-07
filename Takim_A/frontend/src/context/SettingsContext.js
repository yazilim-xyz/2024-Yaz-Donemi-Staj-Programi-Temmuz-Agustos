import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en', // Varsayılan dil
  });

  const toggleTheme = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      theme: prevSettings.theme === 'light' ? 'dark' : 'light',
    }));
  };

  const changeLanguage = (lang) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      language: lang,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, toggleTheme, changeLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};
