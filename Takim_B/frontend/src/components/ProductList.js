import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { db } from '../service/firebase';
import { addProductToCart, getCartItems } from '../service/cartService';
import { FaSearch } from 'react-icons/fa';
import { calculateTotal } from '../features/totalAmount/totalAmountSlice';
import Loading from './Loading';

const ProductList = ({ category, darkMode }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

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
          return { id: doc.id, productName: data.productName, price: data.price, image: data.image, quantity: data.quantity };
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

  useEffect(() => {
    const productsRef = collection(db, 'products');
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const productsList = snapshot.docs.map(doc => {
        const data = doc.data();
        return { id: doc.id, productName: data.productName, price: data.price, image: data.image, quantity: data.quantity };
      });
      setSelectedProducts(productsList);
    });

    return () => unsubscribe();
  }, []);

  const handleProductClick = async (product) => {
    if (product.quantity === 0) {
      alert('Bu ürün tükendi ve sepete eklenemez.');
      return;
    }
    try {
      await addProductToCart(product);
      alert(`${product.productName} sepete eklendi!`);
      const cartItems = await getCartItems();
      dispatch(calculateTotal(cartItems));
    } catch (error) {
      console.error("Ürün sepete eklenirken hata oluştu: ", error);
      alert('Ürün sepete eklenirken bir hata oluştu.');
    }
  };

  const filteredProducts = selectedProducts.filter(product => 
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className="p-4 max-h-full overflow-auto scrollbar pb-24 lg:pb-4 transition-all duration-300 ease-in-out">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Ürün adı ile ara..."
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
          size={20}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-300 ease-in-out">
        {currentProducts.map(product => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className={`w-full h-full p-4 rounded-3xl shadow-sm transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer ${darkMode ? 'bg-darkBackground text-white' : 'bg-lightBackground text-black'} ${product.quantity === 0 ? 'grayscale cursor-not-allowed' : ''}`}
          >
            <div className="w-full h-40 bg-gray-200 rounded-2xl overflow-hidden">
              {product.image && <img src={product.image} alt={product.productName} className="w-full h-full object-cover rounded-2xl" />}
            </div>
            <h3 className="font-semibold mt-2">{product.productName}</h3>
            <div className='flex justify-between'>
              <p>₺{product.price}</p>
              <p>{product.quantity === 0 ? 'Tükendi' : `Stok: ${product.quantity}`}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
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
    <div className="flex justify-center mt-4 transition-all duration-100 ease-in-out">
      <ul className="flex space-x-2">
        {pageNumbers.map(number => (
          <li key={number} className={`cursor-pointer ${currentPage === number ? 'font-bold' : ''} transition-all duration-100 ease-in-out`}>
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
