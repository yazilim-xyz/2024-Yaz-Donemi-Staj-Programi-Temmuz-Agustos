import en from './translations/en.json';
import tr from './translations/tr.json';

const translations = { en, tr };

export const translate = (key, language) => {
  return translations[language][key] || key; // Anahtar bulunamazsa anahtarı geri döndür
};
