import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../service/firebase'; // Firebase importunuzu ayarlayın
import { FaList } from 'react-icons/fa'; // FaList ikonunu import edin

const StockTracking = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false); // Menü açık/kapalı durumunu kontrol etmek için

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryCollection = collection(db, 'categories');
                const categorySnapshot = await getDocs(categoryCollection);
                const categoryList = categorySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCategories(categoryList);
            } catch (error) {
                console.error("Error fetching categories: ", error);
                setError("Kategorileri getirirken bir hata oluştu.");
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, 'products');
                const productsSnapshot = await getDocs(productsCollection);
                const productList = productsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setProducts(productList.filter(product => product.quantity === 0));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products: ", error);
                setError("Ürünleri getirirken bir hata oluştu.");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setMenuOpen(false); // Seçim yapıldığında menüyü kapat
    };

    if (loading) {
        return <div className="text-center p-6">Yükleniyor...</div>;
    }

    if (error) {
        return <div className="text-center p-6 text-red-600">{error}</div>;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Stokta Olmayan Ürünler</h1>
            {/* Kategori Seçim Butonu */}
            <div className="mb-6 flex justify-end relative">
                <div className='fixed'>
                    <button
                        onClick={toggleMenu}
                        className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center"
                    >
                        <FaList className="text-xl text-gray-700 mr-2" />
                    </button>
                </div>
                {menuOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-full z-10">
                        <ul className="p-2">
                            <li>
                                <button
                                    onClick={() => handleCategorySelect('all')}
                                    className={`w-full text-left p-2 ${selectedCategory === 'all' ? 'bg-gray-200' : ''} hover:bg-gray-300 transition duration-200`}
                                >
                                    Tüm Kategoriler
                                </button>
                            </li>
                            {categories.map(category => (
                                <li key={category.id}>
                                    <button
                                        onClick={() => handleCategorySelect(category.name)}
                                        className={`w-full text-left p-2 ${selectedCategory === category.name ? 'bg-gray-200' : ''} hover:bg-gray-300 transition duration-200`}
                                    >
                                        {category.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {filteredProducts.length === 0 ? (
                <div className="pt-5 text-center text-gray-700">Stokta olmayan ürün bulunmamaktadır.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredProducts.map(product => (
                        <div
                            key={product.id}
                            className="border p-4 rounded-lg shadow-lg bg-gray-200 opacity-70"
                        >
                            <h2 className="text-xl font-semibold">{product.productName}</h2>
                            <p className="text-md">Barkod: {product.barcodeId}</p>
                            <p className="text-md">Kategori: {product.category}</p>
                            <p className="text-md">Fiyat: {product.price}₺</p>
                            <p className="text-md">Stok: {product.quantity}</p>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
};

export default StockTracking;
