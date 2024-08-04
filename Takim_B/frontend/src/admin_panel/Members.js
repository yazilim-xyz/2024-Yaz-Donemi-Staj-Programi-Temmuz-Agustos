import React, { useState, useEffect } from 'react';

// Örnek Üye Verisi (Gerçek uygulamada API'den alınır)
const sampleMembers = [
  { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', role: 'Admin' },
  { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', role: 'Üye' },
  { id: 3, name: 'Mehmet Can', email: 'mehmet@example.com', role: 'Yönetici' },
  // Diğer üyeler...
];

const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Burada gerçek API çağrısı yapılır.
    // Örneğin: fetch('/api/members').then(response => response.json()).then(data => setMembers(data));
    setMembers(sampleMembers); // Örnek veriler ile başlatıyoruz.
  }, []);

  return (
    <div className="p-6 max-w-6xl mt-4 mx-auto bg-gray-50 text-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Üyeler</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İsim</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-posta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {/* <button className="text-indigo-600 hover:text-indigo-900">Düzenle</button> */}
                  <button className="ml-4 text-red-600 hover:text-red-900">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
