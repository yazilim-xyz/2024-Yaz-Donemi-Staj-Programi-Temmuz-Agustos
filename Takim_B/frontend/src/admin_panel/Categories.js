import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from '../service/firebase'; // Adjust the import path as needed

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryCollection = collection(db, 'categories');
        const categorySnapshot = await getDocs(categoryCollection);
        const categoryList = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        console.log('Fetched categories:', categoryList); // Debugging line
        
        setCategories(prevCategories => {
         
          if (JSON.stringify(prevCategories) !== JSON.stringify(categoryList)) {
            return categoryList;
          }
          return prevCategories;
        });
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []); 

  
  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        const categoryCollection = collection(db, 'categories');
        const docRef = await addDoc(categoryCollection, { name: newCategory.trim() });
        setCategories(prevCategories => [
          ...prevCategories,
          { id: docRef.id, name: newCategory.trim() }
        ]);
        setNewCategory('');
      } catch (error) {
        console.error("Error adding category: ", error);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const categoryDoc = doc(db, 'categories', id);
      await deleteDoc(categoryDoc);
      setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };

 
  const handleEditCategory = async () => {
    if (editCategoryId && editCategoryName.trim()) {
      try {
        const categoryDoc = doc(db, 'categories', editCategoryId);
        await updateDoc(categoryDoc, { name: editCategoryName.trim() });
        setCategories(prevCategories =>
          prevCategories.map(category =>
            category.id === editCategoryId ? { ...category, name: editCategoryName.trim() } : category
          )
        );
        setEditCategoryId(null);
        setEditCategoryName('');
      } catch (error) {
        console.error("Error updating category: ", error);
      }
    } else {
      console.error("Invalid category ID or name.");
    }
  };

  return (
    <div className="mt-20 p-6 max-w-6xl mx-auto bg-gray-50 text-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Kategori Yönetimi</h1>
      <div className="mb-6 flex items-center">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg mr-4 w-full max-w-md"
          placeholder="Yeni kategori adı"
        />
        <button
          onClick={handleAddCategory}
          className="bg-green_a text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          EKLE
        </button>
      </div>

      {editCategoryId && (
        <div className="mb-6 flex items-center">
          <input
            type="text"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg mr-4 w-full max-w-md"
            placeholder="Yeni kategori adı"
          />
          <button
            onClick={handleEditCategory}
            className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            GÜNCELLE
          </button>
        </div>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`border border-gray-300 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-gray-300 transition duration-300 p-4 rounded-lg`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{index + 1}</span>
                <span className="flex-1 text-center">{category.name}</span>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setEditCategoryId(category.id);
                      setEditCategoryName(category.name);
                    }}
                    className="text-blue-500 hover:text-blue-700 transition duration-300"
                  >
                    <FaEdit className="inline-block" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
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