import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { updateProduct } from '../../service/productService'; // İlgili yolu kontrol edin

const UpdateProductModal = ({ product, categories, isOpen, onRequestClose, onProductUpdate }) => {
  const [productName, setProductName] = useState(product?.productName || '');
  const [barcodeId, setBarcodeId] = useState(product?.barcodeId || '');
  const [price, setPrice] = useState(product?.price || '');
  const [category, setCategory] = useState(product?.category || '');
  const [quantity, setQuantity] = useState(product?.quantity || 1);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(product?.image || ''); // Yeni state
  const [description, setDescription] = useState(product?.description || '');

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setBarcodeId(product.barcodeId);
      setPrice(product.price);
      setCategory(product.category);
      setQuantity(product.quantity);
      setDescription(product.description || '');
      setImagePreview(product.image || ''); // Mevcut resmi göster
    }
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        productName,
        barcodeId,
        price,
        category,
        quantity,
        description: description || '',
      };
      if (image) {
        // Image upload logic here if necessary
      }
      await updateProduct(product.id, updatedProduct);
      onProductUpdate();
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '2rem',
      borderRadius: '1rem',
      backgroundColor: '#f9fafb', // Customize background color
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dark overlay background
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Ürün Güncelle"
      style={customStyles}
    >
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Ürün Güncelle</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="productName" className="block text-gray-800 text-sm font-medium mb-2">
                Ürün Adı
              </label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="barcodeId" className="block text-gray-800 text-sm font-medium mb-2">
                Barkod No
              </label>
              <input
                type="number"
                id="barcodeId"
                value={barcodeId}
                onChange={(e) => setBarcodeId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-gray-800 text-sm font-medium mb-2">
                Fiyat
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-gray-800 text-sm font-medium mb-2">
                Kategori
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Kategori Seçin</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-gray-800 text-sm font-medium mb-2">
                Adet
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                min="1"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="image" className="block text-gray-800 text-sm font-medium mb-2">
                Ürün Resmi
              </label>
              {imagePreview && (
                <div className="mb-4">
                  <img src={imagePreview} alt="Ürün Resmi" className="max-w-xs h-auto rounded-lg" /> {/* Resim boyutu sınırlandırıldı */}
                </div>
              )}
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                accept="image/*"
              />
            </div>
          </div>

          <div className="p-4 flex justify-end space-x-4">
            <button
              type="button"
              className="bg-red-800 text-white px-6 py-3 rounded-lg hover:bg-red-900 transition duration-300 shadow-lg"
              onClick={onRequestClose}
            >
              İptal
            </button>

            <button
              type="submit"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition duration-300 shadow-lg"
              onClick={handleSubmit}
            >
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateProductModal;
