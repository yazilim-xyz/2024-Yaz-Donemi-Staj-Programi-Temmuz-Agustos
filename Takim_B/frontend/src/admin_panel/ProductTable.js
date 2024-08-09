import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { fetchProducts, deleteProduct } from '../../../backend/service/productService';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../backend/service/firebase';
import UpdateProductModal from '../components/modal/UpdateProductModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';

const ProductTable = ({darkMode}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 5; // Sayfa başına ürün sayısı

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      toast.success('Ürün başarıyla silindi!');
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Ürün silinirken bir hata oluştu:", error);
      toast.error('Ürün silinirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchProductList = async () => {
      const productsFromFirestore = await fetchProducts();
      setProducts(productsFromFirestore);
    };

    const fetchCategories = async () => {
      setLoading(true);
      try {

        const categoryCollection = collection(db, 'categories');
        const categorySnapshot = await getDocs(categoryCollection);
        const categoryList = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      } finally{
        setLoading(false);
      }
    };

    fetchProductList();
    fetchCategories();
  }, []);

  // Filtreleme işlemi
  const filteredProducts = products.filter(product => {
    const name = product.productName || '';
    const barcode = product.barcodeId || '';
    const category = product.category || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           barcode.includes(searchTerm) ||
           category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Mevcut sayfa için ürünleri filtreleme
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Sayfa değiştirme işlevi
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if(loading) {
      return <Loading/>;
    }
  return (
    <div className="mt-12 p-6 max-w-6xl mx-auto">
      <h1 className={`text-3xl font-bold mb-6 text-center text-gray-800  ${darkMode ? 'text-white' : 'text-gray-800'}`}>Ürün Listeleme</h1>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Ürün adı, kategori adı veya barkod ile ara..."
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
          size={20}
        />
      </div>
      <div className="space-y-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => {
            const price = Number(product.price) || 0;
            const quantity = product.quantity;
            return (
              <div key={product.id} className={`flex items-center p-4 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105 ${darkMode ? 'bg-darkBackground' : 'bg-lightBackground'}`}>
                <div className="w-1/4">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
                <div className="w-1/2 px-4">
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>{product.productName}</h2>
                  <p className={`${darkMode ? 'text-white' : 'text-black'}`}>Kategori: <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{product.category}</span></p>
                  <p className={`${darkMode ? 'text-white' : 'text-black'}`}>Barkod No: <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{product.barcodeId}</span></p>
                  <p className={`${darkMode ? 'text-white' : 'text-black'}`}>Stok: <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{product.quantity}</span></p>
                </div>
                <div className="w-1/4 text-right">
                  <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>₺{price.toFixed(2)}</p>
                  <div className="mt-2 flex justify-end space-x-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className={`hover:transform transition-transform duration-300 ease-in-out hover:scale-105 ${darkMode ? 'text-white' : 'text-black'}`}
                    >
                      <FaEdit className="inline-block mr-1" /> Güncelle
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700 transform transition-transform duration-300 ease-in-out hover:scale-105"
                    >
                      <FaTrash className="inline-block mr-1" /> Sil
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-4 text-center text-gray-500">Arama sonucunda ürün bulunamadı</div>
        )}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      {isModalOpen && selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          categories={categories}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onProductUpdate={async () => {
            const updatedProducts = await fetchProducts();
            setProducts(updatedProducts);
            setIsModalOpen(false);
          }}
        />
      )}
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

// Pagination bileşeni
const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage, darkMode }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`flex justify-center mt-4`}>
      <ul className="flex space-x-2">
        {pageNumbers.map(number => (
          <li key={number} className={`cursor-pointer ${currentPage === number ? 'font-bold' : ''}`}>
            <a onClick={() => paginate(number)} className={`p-2 border rounded-lg hover:bg-gray-300 transition duration-300 `}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductTable;
