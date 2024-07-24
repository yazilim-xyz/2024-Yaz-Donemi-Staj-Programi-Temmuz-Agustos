import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";

const Home = () => {
  const navigate = useNavigate(); 

  const handleLogoutClick = () => {
    navigate('/'); // 'login' sayfasına yönlendirme
  };

  return (
    <div className="min-h-screen bg-gray-100 bg-cover bg-center" style={{ backgroundImage: 'url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)' }}>
      <header className="bg-transparent p-4 shadow-md h-40 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-center text-priimary">WorkChat</h1>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Link to="/messages" className="hover:scale-105 transition-transform duration-300">
            <div className="bg-secondary bg-opacity-60 mt-20 p-6 rounded-lg shadow-lg flex items-center justify-center flex-col h-80 hover:bg-secondary hover:scale-105 transition-transform duration-300">
              <div className="text-7xl mt-12 text-blue-600">
                <BsFillChatSquareTextFill />
              </div>
              <h2 className="text-xl font-semibold mt-5 text-white">Mesajlar</h2>
            </div>
          </Link>

          <Link to="/groups" className="hover:scale-105 transition-transform duration-300">
            <div className="bg-secondary bg-opacity-60 mt-20 p-6 rounded-lg shadow-lg flex items-center justify-center flex-col h-80 hover:bg-secondary hover:scale-105 transition-transform duration-300">
              <div className="text-8xl mt-7 text-blue-600">
                <MdGroups />
              </div>
              <h2 className="text-xl font-semibold mt-2 text-white">Gruplar</h2>
            </div>
          </Link>

          <Link to="/settings" className="hover:scale-105 transition-transform duration-300">
            <div className="bg-secondary bg-opacity-60 mt-20 p-6 rounded-lg shadow-lg flex items-center justify-center flex-col h-80 hover:bg-secondary hover:scale-105 transition-transform duration-300">
              <div className="text-8xl mt-7 text-blue-600">
                <IoMdSettings />
              </div>
              <h2 className="text-xl font-semibold text-white">Ayarlar</h2>
            </div>
          </Link>
        </div>

        <div 
          className="items-center flex justify-around bg-secondary bg-opacity-60 p-6 rounded-lg shadow-lg mx-auto mt-20 max-w-lg hover:bg-bordo hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={handleLogoutClick} // Click olayını ekleyin
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Çıkış Yap</h2>
          <div className="text-8xl text-blue-600">
            <IoExitOutline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
