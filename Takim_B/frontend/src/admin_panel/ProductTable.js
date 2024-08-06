import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaTrash, FaSearch, FaEllipsisV } from "react-icons/fa";
import { fetchProducts, deleteProduct } from '../service/productService';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../service/firebase'; 
import UpdateProductModal from '../components/modal/UpdateProductModal';

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openMenu, setOpenMenu] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 7; // Sayfa başına ürün sayısı

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      alert('Ürün başarıyla silindi!');
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Ürün silinirken bir hata oluştu:", error);
      alert('Ürün silinirken bir hata oluştu.');
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
      try {
        const categoryCollection = collection(db, 'categories');
        const categorySnapshot = await getDocs(categoryCollection);
        const categoryList = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchProductList();
    fetchCategories();
  }, []);

  useEffect(() => {
    const closeMenuOnOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
  
    document.addEventListener('click', closeMenuOnOutsideClick);
  
    return () => {
      document.removeEventListener('click', closeMenuOnOutsideClick);
    };
  }, []);
  
  const handleMenuToggle = (productId) => {
    setOpenMenu(openMenu === productId ? null : productId);
  };
  
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

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 text-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Ürün Tablosu</h1>
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
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">No</th>
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">Resim</th>
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">Ürün Adı</th>
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">Barkod No</th>
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">Kategori</th>
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">Fiyat</th>
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">Adet</th>
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">Eylem</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => {
                const price = Number(product.price) || 0;
                return (
                  <tr key={product.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-gray-300 transition duration-300`}>
                    <td className="py-2 px-4 text-center text-xs sm:text-sm md:text-base">{indexOfFirstProduct + index + 1}</td>
                    <td className="py-2 px-4 text-center">
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4 text-xs sm:text-sm md:text-base">{product.productName}</td>
                    <td className="py-2 px-4 text-xs sm:text-sm md:text-base">{product.barcodeId}</td>
                    <td className="py-2 px-4 text-xs sm:text-sm md:text-base">{product.category}</td>
                    <td className="py-2 px-4 text-xs sm:text-sm md:text-base">${price.toFixed(2)}</td>
                    <td className="py-2 px-4 text-xs sm:text-sm md:text-base">{product.quantity || 0}</td>
                    <td className="py-2 px-4 flex justify-center space-x-4 text-xs sm:text-sm md:text-base">
                      {/* Actions Menu */}
                      <div className="relative mt-6">
                        <FaEllipsisV
                          ref={menuButtonRef}
                          className="text-gray-500 cursor-pointer hover:text-gray-700"
                          size={20}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event from bubbling up to document
                            handleMenuToggle(product.id);
                          }}
                        />
                        {openMenu === product.id && (
                          <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                            <button
                              onClick={() => handleEdit(product)}
                              className="w-full px-4 py-2 text-left text-blue-500 hover:bg-green-100"
                            >
                              <FaEdit className="inline-block" /> Güncelle
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
                            >
                              <FaTrash className="inline-block" /> Sil
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="py-4 px-4 text-center text-gray-500 text-xs sm:text-sm md:text-base">Arama sonucunda ürün bulunamadı</td>
              </tr>
            )}
          </tbody>
        </table>
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
    </div>
  );
};

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        {pageNumbers.map(number => (
          <li key={number} className={`cursor-pointer ${currentPage === number ? 'font-bold' : ''}`}>
            <a onClick={() => paginate(number)} className="p-2 border rounded-lg hover:bg-gray-300 transition duration-300">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductTable;
