import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillSaveFill } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";

const Settings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    notifications: true,
    profileVisibility: 'public',
    language: 'English'
  });
  const [theme, setTheme] = useState('light');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSaveClick = () => {
    console.log('Settings saved:', formData, isActive);
  };

  const handleBackClick = () => {
    navigate('/home');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  const toggleActiveStatus = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} bg-cover bg-center`} style={{ backgroundImage: theme === 'light' ? 'url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)' : 'url(https://wallpaperaccess.com/full/1248467.jpg)' }}>
      <header className="bg-transparent p-4 shadow-md h-40 flex items-center justify-center">
        <h1 className={`text-3xl font-bold text-center ${theme === 'light' ? 'text-primary' : 'text-white'}`}>Settings</h1>
      </header>

      <div className="p-6">
        <div className={`bg-secondary bg-opacity-60 p-6 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <button
                className="text-xl font-semibold text-white bg-primary p-2 rounded-lg mr-4 hover:bg-primary-dark transition-colors duration-300"
                onClick={handleBackClick}
              >
                <IoMdArrowBack /> Back
              </button>
              <button
                className="text-xl font-semibold text-white bg-primary p-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
                onClick={handleSaveClick}
              >
                <BsFillSaveFill /> Save
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="text-xl font-semibold text-white bg-primary p-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
              >
                {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              </button>
              <button
                onClick={toggleActiveStatus}
                className={`text-xl font-semibold p-2 rounded-lg transition-colors duration-300 ${isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
              >
                {isActive ? 'Active' : 'Inactive'}
              </button>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className={`block ${theme === 'light' ? 'text-black' : 'text-white'} text-lg font-semibold mb-2`} htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg bg-white border border-gray-300"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className={`block ${theme === 'light' ? 'text-black' : 'text-white'} text-lg font-semibold mb-2`} htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg bg-white border border-gray-300"
                placeholder="Enter your new password"
              />
            </div>
            <div>
              <label className={`block ${theme === 'light' ? 'text-black' : 'text-white'} text-lg font-semibold mb-2`} htmlFor="notifications">Notifications</label>
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                checked={formData.notifications}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className={theme === 'light' ? 'text-black' : 'text-white'}>Enable notifications</span>
            </div>
            <div>
              <label className={`block ${theme === 'light' ? 'text-black' : 'text-white'} text-lg font-semibold mb-2`} htmlFor="profileVisibility">Profile Visibility</label>
              <select
                id="profileVisibility"
                name="profileVisibility"
                value={formData.profileVisibility}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg bg-white border border-gray-300"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div>
              <label className={`block ${theme === 'light' ? 'text-black' : 'text-white'} text-lg font-semibold mb-2`} htmlFor="language">Language</label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg bg-white border border-gray-300"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
