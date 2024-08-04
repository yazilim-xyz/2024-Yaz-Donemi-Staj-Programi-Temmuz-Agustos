import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../service/firebase'; // Adjust path as needed

const ProductList = ({ category, darkMode }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, 'products');
        const q = category === 'All'
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

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 max-h-full overflow-auto scrollbar">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {selectedProducts.map(product => (
                    <div key={product.id} className={`w-full h-full p-4 rounded-3xl shadow-sm ${darkMode ? 'bg-darkBackground text-white' : 'bg-lightBackground text-black'}`}>
                    <div className="w-full h-40 bg-gray-200 rounded-2xl">
                      {product.image && <img src={product.image} alt={product.productName} className="w-full h-full object-cover rounded-2xl" />}
                    </div>
                    <h3 className="font-semibold mt-2">{product.productName}</h3>
                    <p>${product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        };
        
        export default ProductList;
        