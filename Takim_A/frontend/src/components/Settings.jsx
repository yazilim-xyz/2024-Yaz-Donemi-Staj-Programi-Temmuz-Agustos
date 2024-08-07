import React, { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { translate } from '../translate'; // Doğru yolu kontrol edin
import { useNavigate } from 'react-router-dom';
import { BsFillSaveFill } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";

const Settings = () => {
  const { settings, toggleTheme, changeLanguage } = useContext(SettingsContext);
  const navigate = useNavigate();
  const currentLanguage = settings.language || 'en'; // Kullanıcı dilini ayarla

  const handleSaveClick = () => {
    console.log('Settings saved:', settings);
  };

  const handleBackClick = () => {
    navigate('/home');
  };

  return (
    <div className={`min-h-screen ${settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} bg-cover bg-center`} style={{ backgroundImage: settings.theme === 'light' ? 'url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)' : 'url(https://wallpaperaccess.com/full/1248467.jpg)' }}>
      <header className="bg-transparent p-4 shadow-md h-40 flex items-center justify-center">
        <h1 className={`text-3xl font-bold text-center ${settings.theme === 'light' ? 'text-primary' : 'text-white'}`}>{translate('Settings', currentLanguage)}</h1>
      </header>

      <div className="p-6">
        <div className={`bg-secondary bg-opacity-60 p-6 rounded-lg shadow-lg ${settings.theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <button
                className="text-xl font-semibold text-white bg-primary p-2 rounded-lg mr-4 hover:bg-primary-dark transition-colors duration-300"
                onClick={handleBackClick}
              >
                <IoMdArrowBack /> {translate('Back', currentLanguage)}
              </button>
              <button
                className="text-xl font-semibold text-white bg-primary p-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
                onClick={handleSaveClick}
              >
                <BsFillSaveFill /> {translate('Save', currentLanguage)}
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="text-xl font-semibold text-white bg-primary p-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
              >
                {settings.theme === 'light' ? translate('Switch to Dark Mode', currentLanguage) : translate('Switch to Light Mode', currentLanguage)}
              </button>
              <button
                onClick={() => changeLanguage(settings.language === 'en' ? 'tr' : 'en')}
                className={`text-xl font-semibold p-2 rounded-lg transition-colors duration-300 ${settings.language === 'en' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}
              >
                {settings.language === 'en' ? translate('Switch to Turkish', currentLanguage) : translate('Switch to English', currentLanguage)}
              </button>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className={`block ${settings.theme === 'light' ? 'text-black' : 'text-white'} text-lg font-semibold mb-2`} htmlFor="email">{translate('Email', currentLanguage)}</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 rounded-lg bg-white border border-gray-300"
                placeholder={translate('Enter your email', currentLanguage)}
              />
            </div>
            <div>
              <label className={`block ${settings.theme === 'light' ? 'text-black' : 'text-white'} text-lg font-semibold mb-2`} htmlFor="password">{translate('Password', currentLanguage)}</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 rounded-lg bg-white border border-gray-300"
                placeholder={translate('Enter your new password', currentLanguage)}
              />
            </div>
            <div>
              <label className={`block ${settings.theme === 'light' ? 'text-black' : 'text-white'} text-lg font-semibold mb-2`} htmlFor="notifications">{translate('Notifications', currentLanguage)}</label>
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                className="mr-2"
              />
              <span className={settings.theme === 'light' ? 'text-black' : 'text-white'}>{translate('Enable notifications', currentLanguage)}</span>
            </div>
            <div>
              <label className={`block ${settings.theme === 'light' ? 'text-black' : 'text-white'} text-lg font-semibold mb-2`} htmlFor="profileVisibility">{translate('Profile Visibility', currentLanguage)}</label>
              <select
                id="profileVisibility"
                name="profileVisibility"
                className="w-full p-2 rounded-lg bg-white border border-gray-300"
              >
                <option value="public">{translate('Public', currentLanguage)}</option>
                <option value="private">{translate('Private', currentLanguage)}</option>
              </select>
            </div>
            <div>
              <label className={`block ${settings.theme === 'light' ? 'text-black' : 'text-white'} text-lg font-semibold mb-2`} htmlFor="language">{translate('Language', currentLanguage)}</label>
              <select
                id="language"
                name="language"
                value={settings.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="w-full p-2 rounded-lg bg-white border border-gray-300"
              >
                <option value="en">{translate('English', currentLanguage)}</option>
                <option value="tr">{translate('Turkish', currentLanguage)}</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
