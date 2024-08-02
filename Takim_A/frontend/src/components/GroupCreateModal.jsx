import React, { useState } from 'react';

const GroupCreateModal = ({ isOpen, onClose }) => {
const [searchTerm, setSearchTerm] = useState('');
const [selectedUsers, setSelectedUsers] = useState([]);

const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
};

const handleUserSelect = (user) => {
    if (selectedUsers.includes(user)){
        //eğer kullanıcı zaten seçilmişşe listeden çıkar.
        setSelectedUsers(selectedUsers.filter(u => u !== user));

    }
    else{
        //kullanıcıyı seç.
        setSelectedUsers([...selectedUsers, user]);
    }
};

const handleGroupCreate = () => {
    // Grubu oluşturma işlemini burada yapacağız.
    onClose(); // Modal'i kapat
};

if (!isOpen) return null;

return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold text-black mb-4">Grup Oluştur</h2>
            <input
            type="text"
            placeholder="Kişi arayın..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded-lg mb-4 text-black"
            />
            <ul className="max-h-40 overflow-y-auto mb-4 overflow-auto">
                {/* Örnek kişiler */}
                {['Ahmet', 'Ayşe', 'Mehmet', 'Fatma'].map((user) => (
                    <li 
                    key={user} 
                    className="py-2 pr-1 cursor-pointer hover:bg-[#B3C8CF] rounded-lg text-black " 
                    onClick={() => handleUserSelect(user)}
                    >
                    <input type="checkbox"
                    checked={selectedUsers.includes(user)}
                    readOnly
                    className='mr-4 w-6 h-6 rounded-md cursor-pointer shadow ' 
                    />
                    {user}
                    </li>
                ))}
            </ul>
            <div className="flex justify-end gap-2">
                <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-[#B80000]"
                >
                İptal
                </button>
                <button
                onClick={handleGroupCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                    Oluştur
                </button>
                </div>
                </div>
                </div>
                );
};

export default GroupCreateModal;
