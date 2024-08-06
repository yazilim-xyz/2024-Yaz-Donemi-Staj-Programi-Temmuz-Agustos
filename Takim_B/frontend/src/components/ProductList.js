import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../service/firebase';

const ProductList = ({ category, darkMode }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, 'products');
        const q = category === 'Tüm Ürünler' || category === 'All'
          ? query(productsRef)
          : query(productsRef, where('category', '==', category));

        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, productName: data.productName, price: data.price, image: data.image };
        });
        setSelectedProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = selectedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 max-h-full overflow-auto scrollbar pb-24 lg:pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentProducts.map(product => (
          <div
            key={product.id}
            className={`w-full h-full p-4 rounded-3xl shadow-sm transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${darkMode ? 'bg-darkBackground text-white' : 'bg-lightBackground text-black'}`}
          >
            <div className="w-full h-40 bg-gray-200 rounded-2xl overflow-hidden">
              {product.image && <img src={product.image} alt={product.productName} className="w-full h-full object-cover rounded-2xl" />}
            </div>
            <h3 className="font-semibold mt-2">{product.productName}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={selectedProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
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
            <a
              onClick={() => paginate(number)}
              className="p-2 rounded-lg transition-transform duration-300 ease-in-out hover:bg-primary hover:text-white transform hover:scale-105"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
