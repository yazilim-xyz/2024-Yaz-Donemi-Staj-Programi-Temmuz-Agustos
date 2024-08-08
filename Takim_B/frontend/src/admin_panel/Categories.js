import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from '../service/firebase'; // Adjust the import path as needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';

const AdminCategoryPage = ({darkMode}) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
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
        toast.success('Kategori başarıyla eklendi!');
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
      toast.success('Kategori başarıyla silindi!');
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
        toast.success('Kategori başarıyla düzenlendi!');
      } catch (error) {
        console.error("Error updating category: ", error);
      }
    } else {
      console.error("Invalid category ID or name.");
    }
  };

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className="mt-20 p-6 max-w-6xl mx-auto">
      <h1 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Kategori Yönetimi</h1>
      <div className="mb-6 flex justify-center items-center">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg mr-4 w-full max-w-md"
          placeholder="Yeni kategori adı"
        />
        <button
          onClick={handleAddCategory}
          className="bg-green_a text-white px-4 py-2 rounded-lg hover:bg-blue-600 transform transition-transform duration-300 ease-in-out hover:scale-105"
        >
          EKLE
        </button>
      </div>
      {editCategoryId && (
        <div className="mb-6 flex justify-center items-center">
          <input
            type="text"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg mr-4 w-full max-w-md"
            placeholder="Yeni kategori adı"
          />
          <button
            onClick={handleEditCategory}
            className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transform transition-transform duration-300 ease-in-out hover:scale-105"
          >
            GÜNCELLE
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`p-4 border border-gray-300 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 ease-in-out hover:scale-105 ${darkMode ? 'bg-darkBackground text-white' : 'bg-lightBackground text-black'}`}
          >
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg mb-2">{category.name}</span>
              <div className="flex space-x-2">
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
      <ToastContainer
        position="top-center" // Center the toast horizontally
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AdminCategoryPage;
