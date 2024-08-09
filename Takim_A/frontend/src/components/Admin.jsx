import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupCreateModal from './GroupCreateModal';
import { IoMdArrowBack } from "react-icons/io";
import { SettingsContext } from '../context/SettingsContext'; 

const Admin = () => {
  const { settings } = useContext(SettingsContext); 
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { _id: '1', username: 'User1', lastLogout: new Date().toLocaleString() },
    { _id: '2', username: 'User2', lastLogout: new Date().toLocaleString() },
    { _id: '3', username: 'User3', lastLogout: new Date().toLocaleString() },
  ]);

  const [groups, setGroups] = useState([
    { _id: 'g1', name: 'Group 1', users: ['1', '2'] },
    { _id: 'g2', name: 'Group 2', users: ['2', '3'] },
    { _id: 'g3', name: 'Group 3', users: ['1'] },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '' });

  const handleBackClick = () => {
    navigate('/home');
  };

  const handleCreateGroupClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveUserFromGroup = (userId, groupId) => {
    setGroups(groups.map(group =>
      group._id === groupId ? { ...group, users: group.users.filter(id => id !== userId) } : group
    ));
  };

  const handleAddUserToGroup = (userId, groupId) => {
    setGroups(groups.map(group =>
      group._id === groupId ? { ...group, users: [...group.users, userId] } : group
    ));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    const newUserWithId = {
      _id: (users.length + 1).toString(),
      username: newUser.username,
      lastLogout: new Date().toLocaleString()
    };
    setUsers([...users, newUserWithId]);
    setNewUser({ username: '', password: '' });
  };

  return (
    <div className={`min-h-screen ${settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} bg-cover bg-center`} style={{ backgroundImage: settings.theme === 'light' ? 'url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)' : 'url(https://wallpaperaccess.com/full/1248467.jpg)', fontFamily: 'Roboto, sans-serif' }}>
      <header className="bg-transparent p-4 shadow-md h-40 flex items-center justify-center">
        <h1 className={`text-3xl font-bold text-center ${settings.theme === 'light' ? 'text-black' : 'text-white'}`}>Admin Page</h1>
      </header>

      <div className={`p-6 ${settings.theme === 'light' ? 'bg-white' : 'bg-gray-700'} bg-opacity-60 rounded-lg shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <button
            className={`text-xl font-semibold ${settings.theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'} p-2 rounded-lg mr-4 hover:bg-gray-700 transition-colors duration-300`}
            onClick={handleBackClick}
          >
            <IoMdArrowBack /> Back
          </button>
          <button
            className={`text-xl font-semibold ${settings.theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'} p-2 rounded-lg mr-4 hover:bg-gray-700 transition-colors duration-300`}
            onClick={handleCreateGroupClick}
          >
            Create A New Group
          </button>
        </div>

        <h2 className={`text-2xl font-bold mb-4 ${settings.theme === 'light' ? 'text-black' : 'text-white'}`}>Users</h2>
        <ul className="list-disc pl-5">
          {users.map(user => (
            <li key={user._id} className={`mb-2 flex justify-between ${settings.theme === 'light' ? 'text-black' : 'text-white'}`}>
              <span>{user.username}</span>
              <span className="text-sm text-gray-600">Last Log Out: {user.lastLogout}</span>
            </li>
          ))}
        </ul>

        <h2 className={`text-2xl font-bold mb-4 mt-6 ${settings.theme === 'light' ? 'text-black' : 'text-white'}`}>Groups</h2>
        {groups.map(group => (
          <div
            key={group._id}
            className={`bg-secondary bg-opacity-60 p-6 rounded-lg shadow-lg mb-4 relative ${settings.theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}
          >
            <h3 className={`text-xl font-semibold mb-4 ${settings.theme === 'light' ? 'text-black' : 'text-white'}`}>Group: {group.name}</h3>
            <div className="mt-4">
              <label htmlFor={`userSelect-${group._id}`} className={`block ${settings.theme === 'light' ? 'text-black' : 'text-white'} font-semibold mb-2`}>Add user to group:</label>
              <select
                id={`userSelect-${group._id}`}
                className={`p-2 rounded border border-gray-300 ${settings.theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
                onChange={(e) => handleAddUserToGroup(e.target.value, group._id)}
              >
                <option value="">Select a user:</option>
                {users.filter(user => !group.users.includes(user._id)).map(user => (
                  <option key={user._id} value={user._id}>{user.username}</option>
                ))}
              </select>
            </div>
            <ul className="list-disc pl-5 mt-4">
              {group.users.map(userId => {
                const user = users.find(u => u._id === userId);
                return (
                  <li key={userId} className={`mb-2 flex justify-between ${settings.theme === 'light' ? 'text-black' : 'text-white'}`}>
                    <span>{user ? user.username : 'Unknown user'}</span>
                    <button
                      onClick={() => handleRemoveUserFromGroup(userId, group._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

<h2 className={`text-2xl font-bold mb-4 mt-6 ${settings.theme === 'light' ? 'text-black' : 'text-white'}`}>Create New User</h2>
<form onSubmit={handleCreateUser} className="mb-6">
  <div className="mb-4">
    <label htmlFor="username" className={`block ${settings.theme === 'light' ? 'text-black' : 'text-white'} font-semibold mb-2`}>
      Username
    </label>
    <input
      id="username"
      type="text"
      value={newUser.username}
      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      className={`p-2 rounded-lg border border-gray-300 w-full ${settings.theme === 'light' ? 'bg-white' : 'bg-gray-800'} ${settings.theme === 'light' ? 'text-black' : 'text-white'} focus:outline-none focus:ring-2 focus:ring-primary`}
      placeholder="Enter username"
      required
    />
  </div>
  <div className="mb-4">
    <label htmlFor="password" className={`block ${settings.theme === 'light' ? 'text-black' : 'text-white'} font-semibold mb-2`}>
      Password
    </label>
    <input
      id="password"
      type="password"
      value={newUser.password}
      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      className={`p-2 rounded-lg border border-gray-300 w-full ${settings.theme === 'light' ? 'bg-white' : 'bg-gray-800'} ${settings.theme === 'light' ? 'text-black' : 'text-white'} focus:outline-none focus:ring-2 focus:ring-primary`}
      placeholder="Enter password"
      required
    />
  </div>
  <button
    type="submit"
    className={`text-xl font-semibold w-full p-2 rounded-lg transition-colors duration-300 ${settings.theme === 'light' ? 'bg-black text-white hover:bg-gray-700' : 'bg-white text-black hover:bg-gray-600'}`}
  >
    Create User
  </button>
</form>

      </div>

      {isModalOpen && <GroupCreateModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Admin;
