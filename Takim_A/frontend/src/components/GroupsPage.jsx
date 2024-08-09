import React, { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { translate } from '../translate'; // Import the translate function

const groups = [
  { name: 'Frontend Developers', members: 5 },
  { name: 'Backend Developers', members: 3 },
  { name: 'Fullstack Developers', members: 4 },
  { name: 'Mobil Developers', members: 4 },
  { name: 'Management', members: 4 },
  // Daha fazla grup ekleyebilirsiniz
];

const GroupsPage = () => {
  const { settings } = useContext(SettingsContext);

  const backgroundImageUrl = settings.theme === 'light'
    ? 'url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)'
    : 'url(https://wallpaperaccess.com/full/1248467.jpg)';

  const currentLanguage = settings.language || 'en';

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: backgroundImageUrl }}>
      <div className={`w-[85%] h-[80%] ${settings.theme === 'light' ? 'bg-[#007EA7] bg-opacity-90' : 'bg-[#2C3E50] bg-opacity-90'} rounded-xl p-6 flex flex-wrap justify-center items-center gap-6 overflow-y-auto`}>
        {groups.map((group, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg shadow-lg w-[200px] h-[150px] flex flex-col justify-center items-center transform transition-transform duration-300 hover:scale-105 ${settings.theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
          >
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-bold mb-2">{group.name}</h3>
              <p className="text-sm text-gray-500">{group.members} {translate('members', currentLanguage)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupsPage;
