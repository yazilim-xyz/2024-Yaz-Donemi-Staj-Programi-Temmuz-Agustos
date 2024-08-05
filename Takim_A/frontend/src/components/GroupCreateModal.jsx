import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const GroupCreateModal = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            setGroupName(""); //grup ismi inputunu temizle
            setSelectedUsers([]);// seçilen kşiler sıfırlanır.
            setErrorMessage("");
        }
    }, [isOpen]);

    useEffect(() => {
        if (isNameModalOpen) {

            setGroupName("");
        }
    }, [isNameModalOpen]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleUserSelect = (user) => {
        if (selectedUsers.includes(user)) {
            //eğer kullanıcı zaten seçilmişşe listeden çıkar.
            setSelectedUsers(selectedUsers.filter((u) => u !== user));
        } else {
            //kullanıcıyı seç.
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleGroupCreate = () => {
        try {
            if (selectedUsers.length === 0) {
                throw new Error("Lütfen gruba eklemek istediğiniz kişileri seçiniz!!!");
                return;
            }
            setIsNameModalOpen(true); // Name modalı açılır.
            setErrorMessage(""); // Hata mesajını temizle

        } catch (error) {
            setErrorMessage(error.message); // Hata mesajını state'e kaydet
        }
    };


    const handleGroupNameSubmit = () => {
        
        try {
            if (!groupName.trim()) {
                throw new Error("Lütfen gruba isim giriniz!");
                return;
            }
            console.log("Grup ismi: ", groupName);
            console.log("Seçilen kullanıcılar: ", selectedUsers); //kullanıcı
            setIsNameModalOpen(false);
            onClose();
            navigate('/groupchat');
        } catch (error) {
            setErrorMessage(error.message); // Hata mesajını state'e kaydet
        }

    };

    if (!isOpen) return null;

    return (
        <div>
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
                        {["Ahmet", "Ayşe", "Mehmet", "Fatma"].map((user) => (
                            <li
                                key={user}
                                className="py-2 pr-1 cursor-pointer hover:bg-[#B3C8CF] rounded-lg text-black"
                                onClick={() => handleUserSelect(user)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user)}
                                    readOnly
                                    className="mr-4 w-6 h-6 rounded-md cursor-pointer shadow"
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
                    <div>{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}</div>
                </div>
            </div>

            {/* Grup ismi modalı */}
            {isNameModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-lg font-bold text-black mb-4">
                            Grup İsmi Girin
                        </h2>
                        <input
                            type="text"
                            placeholder="Grup ismi"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg mb-4 text-black"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsNameModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-[#B80000]"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleGroupNameSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                            >
                                Oluştur
                            </button>
                        </div>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupCreateModal;
