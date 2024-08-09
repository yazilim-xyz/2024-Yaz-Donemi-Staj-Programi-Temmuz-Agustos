import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { MdGroups, MdAdminPanelSettings } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { SettingsContext } from '../context/SettingsContext';
import { translate } from '../translate';

const Home = () => {
  const { settings, changeLanguage } = useContext(SettingsContext);
  const navigate = useNavigate();
  const currentLanguage = settings.language || 'en';

  const handleLogoutClick = () => {
    navigate('/'); // 'login' sayfasına yönlendirme
  };

  return (
    <div className={`min-h-screen ${settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} bg-cover bg-center`} style={{ backgroundImage: settings.theme === 'light' ? 'url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)' : 'url(https://wallpaperaccess.com/full/1248467.jpg)' }}>
      <header className="bg-transparent p-4 shadow-md h-40 flex items-center justify-center">
        <h1 className={`text-3xl font-bold text-center ${settings.theme === 'light' ? 'text-primary' : 'text-white'}`}>{translate('WorkChat', currentLanguage)}</h1>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Link to="/messages" className="group hover:scale-105 transition-transform duration-300">
            <div className={`bg-secondary bg-opacity-60 mt-20 p-6 rounded-lg shadow-lg flex items-center justify-center flex-col h-80 group-hover:bg-primary group-hover:bg-opacity-80 transition-all duration-700 ${settings.theme === 'light' ? 'bg-secondary' : 'bg-secondary'} group-hover:rounded-full`}>
              <div className="text-7xl mt-12 text-white">
                <BsFillChatSquareTextFill />
              </div>
              <h2 className="text-xl font-semibold mt-5 text-white">{translate('Messages', currentLanguage)}</h2>
            </div>
          </Link>

          <Link to="/groups" className="group hover:scale-105 transition-transform duration-300">
            <div className={`bg-secondary bg-opacity-60 mt-20 p-6 rounded-lg shadow-lg flex items-center justify-center flex-col h-80 group-hover:bg-primary group-hover:bg-opacity-80 transition-all duration-700 ${settings.theme === 'light' ? 'bg-secondary' : 'bg-secondary'} group-hover:rounded-full`}>
              <div className="text-8xl mt-7 text-white">
                <MdGroups />
              </div>
              <h2 className="text-xl font-semibold mt-2 text-white">{translate('Groups', currentLanguage)}</h2>
            </div>
          </Link>

          <Link to="/settings" className="group hover:scale-105 transition-transform duration-300">
            <div className={`bg-secondary bg-opacity-60 mt-20 p-6 rounded-lg shadow-lg flex items-center justify-center flex-col h-80 group-hover:bg-primary group-hover:bg-opacity-80 transition-all duration-700 ${settings.theme === 'light' ? 'bg-secondary' : 'bg-secondary'} group-hover:rounded-full`}>
              <div className="text-8xl mt-7 text-white">
                <IoMdSettings />
              </div>
              <h2 className="text-xl font-semibold text-white">{translate('Settings', currentLanguage)}</h2>
            </div>
          </Link>

          <Link to="/admin" className="group hover:scale-105 transition-transform duration-300">
            <div className={`bg-secondary bg-opacity-60 mt-20 p-6 rounded-lg shadow-lg flex items-center justify-center flex-col h-80 group-hover:bg-primary group-hover:bg-opacity-80 transition-all duration-700 ${settings.theme === 'light' ? 'bg-secondary' : 'bg-secondary'} group-hover:rounded-full`}>
              <div className="text-8xl mt-7 text-white">
                <MdAdminPanelSettings />
              </div>
              <h2 className="text-xl font-semibold text-white">{translate('Admin', currentLanguage)}</h2>
            </div>
          </Link>
        </div>

        <div 
          className={`flex items-center justify-around bg-secondary bg-opacity-60 p-6 rounded-lg shadow-lg mx-auto mt-20 max-w-lg transition-all duration-500 cursor-pointer 
            ${settings.theme === 'light' ? 'bg-secondary' : 'bg-secondary'} 
            hover:bg-primary 
            hover:bg-opacity-80 
            hover:scale-105 
            hover:rounded-xl
          `}
          onClick={handleLogoutClick}
        >
          <h2 className="text-xl font-semibold mb-4 text-white">{translate('Logout', currentLanguage)}</h2>
          <div className="text-8xl text-white">
            <IoLogOutOutline />
          </div>
        </div>


        <div className="flex justify-center mt-8">
        <button 
            onClick={() => changeLanguage(currentLanguage === 'en' ? 'tr' : 'en')} 
            className={`px-4 py-2 rounded-lg text-white transition-transform duration-300 ${settings.theme === 'light' ? 'bg-secondary hover:bg-red-800 hover:scale-105' : 'bg-green-500 hover:bg-red-800 hover:scale-105'}`}
          >
            {currentLanguage === 'en' ? translate('Switch to Turkish', currentLanguage) : translate('Switch to English', currentLanguage)}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Home;
