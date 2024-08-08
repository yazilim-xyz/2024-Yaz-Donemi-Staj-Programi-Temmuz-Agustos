import React, { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { translate } from '../translate'; // Import the translate function

const GroupsPage = () => {
  const { settings } = useContext(SettingsContext);

  const backgroundImageUrl = settings.theme === 'light'
    ? 'url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)'
    : 'url(https://wallpaperaccess.com/full/1248467.jpg)';

  const currentLanguage = settings.language || 'en';

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: backgroundImageUrl }}>
      <div className={`border-2 ${settings.theme === 'light' ? 'border-primary' : 'border-white'} w-[65%] h-[80%] ${settings.theme === 'light' ? 'bg-[#007EA7]' : 'bg-[#2C3E50]'} rounded-xl flex overflow-hidden`}>
        <div className={`text-3xl font-bold ${settings.theme === 'light' ? 'text-black' : 'text-white'} m-auto`}>
          {translate('Groups Page', currentLanguage)}
        </div>
      </div>
    </div>
  );
}

export default GroupsPage;
