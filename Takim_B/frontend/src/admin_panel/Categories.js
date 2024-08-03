import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../service/firebase';
import { addCategory, updateCategory, deleteCategory } from '../service/categoryService';

const AdminCategoryPage = () => {
  const categoryCollection = collection(db, 'categories');
  const [categories, loading, error] = useCollectionData(categoryCollection);
  const [formData, setFormData] = useState({ name: '', id: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      await updateCategory(formData.id, { name: formData.name });
    } else {
      await addCategory({ name: formData.name });
    }
    setFormData({ name: '', id: null });
  };

  const handleEdit = (id, name) => {
    setFormData({ id, name });
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Kategori Yönetimi</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-800 text-sm font-medium mb-2">
              Kategori Adı
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-indigo-400 rounded-lg bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
            {formData.id ? 'Güncelle' : 'Ekle'}
          </button>
        </div>
      </form>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div key={category.id} className={`border-b border-gray-300 ${index % 2 === 0 ? 'bg-indigo-100' : 'bg-purple-100'} hover:bg-purple-200 transition duration-300 p-4 rounded-lg`}>
              <div className="flex justify-between items-center">
                <span className="font-bold">{index + 1}</span>
                <span className="flex-1 text-center">{category.name}</span>
                <div className="flex space-x-4">
                  <button onClick={() => handleEdit(category.id, category.name)} className="text-blue-500 hover:text-blue-700 transition duration-300">
                    <FaEdit className="inline-block" />
                  </button>
                  <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700 transition duration-300">
                    <FaTrash className="inline-block" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryPage;
