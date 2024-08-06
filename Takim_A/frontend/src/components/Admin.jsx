import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupCreateModal from './GroupCreateModal';
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios';

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null); // Seçili grup, kullanıcı eklemek için

  // Kullanıcılar ve grupları API'den çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResult = await axios.get('/api/users'); // BACKEND: Tüm kullanıcıları getiren endpoint
        setUsers(usersResult.data.map(user => ({ ...user, lastLogout: new Date().toLocaleString() })));

        const groupsResult = await axios.get('/api/groups'); // BACKEND: Tüm grupları getiren endpoint
        setGroups(groupsResult.data);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };
    fetchData();
  }, []);

  const handleBackClick = () => {
    navigate('/home');
  };

  const handleCreateGroupClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveUserFromGroup = async (userId, groupId) => {
    try {
      await axios.post(`/api/groups/${groupId}/removeUser`, { userId }); // BACKEND: Kullanıcıyı gruptan çıkaran endpoint
      setGroups(groups.map(group => 
        group._id === groupId ? { ...group, users: group.users.filter(id => id !== userId) } : group
      ));
    } catch (error) {
      console.error('Kullanıcıyı gruptan çıkarma hatası:', error);
    }
  };

  const handleAddUserToGroup = async (userId, groupId) => {
    try {
      await axios.post(`/api/groups/${groupId}/addUser`, { userId }); // BACKEND: Kullanıcıyı gruba ekleyen endpoint
      setGroups(groups.map(group => 
        group._id === groupId ? { ...group, users: [...group.users, userId] } : group
      ));
    } catch (error) {
      console.error('Kullanıcıyı gruba ekleme hatası:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 bg-cover bg-center" style={{ backgroundImage: 'url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)' }}>
      <header className="bg-transparent p-4 shadow-md h-40 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-center text-primary">Admin Page</h1>
      </header>

      <div className="p-6 bg-white bg-opacity-60 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button
            className="text-xl font-semibold text-white bg-primary p-2 rounded-lg mr-4 hover:bg-primary-dark transition-colors duration-300"
            onClick={handleBackClick}
          >
            <IoMdArrowBack /> Back
          </button>
          <button
            className="text-xl font-semibold text-white bg-primary p-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
            onClick={handleCreateGroupClick}
          >
            Create A New Group
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <ul className="list-disc pl-5">
          {users.map(user => (
            <li key={user._id} className="mb-2 flex justify-between">
              <span>{user.username}</span>
              <span className="text-sm text-gray-600">Last Log Out: {user.lastLogout}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mb-4 mt-6">Groups</h2>
        {groups.map(group => (
          <div 
            key={group._id} 
            className="bg-secondary bg-opacity-60 p-6 rounded-lg shadow-lg mb-4 relative"
            onMouseEnter={() => setSelectedGroup(group)} // Üzerine gelindiğinde grup üyelerini göster
            onMouseLeave={() => setSelectedGroup(null)}  // Üzerinden ayrıldığında üyeleri gizle
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Group: {group.name}</h3>
            {selectedGroup && selectedGroup._id === group._id && (
              <div 
                className="absolute left-0 mt-2 p-2 bg-gray-800 text-white rounded shadow-lg w-48"
                style={{ zIndex: 1 }}
              >
                <ul className="list-disc pl-5">
                  {group.users.map(userId => {
                    const user = users.find(u => u._id === userId);
                    return (
                      <li key={userId} className="mb-1 flex justify-between">
                        <span>{user ? user.username : 'Unknown user'}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            
            <div className="mt-4"> 
              <label htmlFor="userSelect" className="block text-white font-semibold mb-2">Add user to group:</label>
              <select
                id="userSelect"
                className="p-2 rounded border border-gray-300"
                onChange={(e) => setSelectedGroup({ ...group, userToAdd: e.target.value })}
              >
                <option value="">Select a user:</option>
                {users.filter(user => !group.users.includes(user._id)).map(user => (
                  <option key={user._id} value={user._id}>{user.username}</option>
                ))}
              </select>
              <button
                onClick={() => selectedGroup && handleAddUserToGroup(selectedGroup.userToAdd, group._id)}
                className="ml-4 bg-primary text-white p-2 rounded hover:bg-primary-dark"
              >
                Add user
              </button>
            </div>
          </div>
        ))}
      </div>

      <GroupCreateModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Admin;
