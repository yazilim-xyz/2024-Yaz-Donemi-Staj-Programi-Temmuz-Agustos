import React, { useState } from "react";

const UpdateProduct = () => {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Ürün güncellendi:', {
      productName,
      productId,
      price,
      category,
      quantity,
      image,
      description,
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 text-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Ürün Güncelle</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label htmlFor="productName" className="block text-gray-800 text-sm font-medium mb-2">
              Ürün Adı
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-gray-500 focus:border-gray-500"
              required
            />
          </div>

          <div>
            <label htmlFor="productId" className="block text-gray-800 text-sm font-medium mb-2">
              Barkod No
            </label>
            <input
              type="number"
              id="productId"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-gray-500 focus:border-gray-500"
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
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-gray-500 focus:border-gray-500"
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
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-gray-500 focus:border-gray-500"
              required
            >
              <option value="">Kategori Seçin</option>
              <option value="Meyve, Sebze">Meyve, Sebze</option>
              <option value="Et, Şarküteri">Et, Şarküteri</option>
              <option value="Atıştırmalık">Atıştırmalık</option>
              <option value="Kuruyemiş">Kuruyemiş</option>
              <option value="İçecekler">İçecekler</option>
              <option value="Glutensiz Ürünler">Glutensiz Ürünler</option>
              <option value="Kahvaltılık Ürünler">Kahvaltılık Ürünler</option>
              <option value="Sağlık, Bakım">Sağlık, Bakım</option>
              <option value="Temizlik">Temizlik</option>
              {/* Diğer kategoriler */}
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
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-gray-500 focus:border-gray-500"
              min="1"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-gray-800 text-sm font-medium mb-2">
              Ürün Resmi
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-gray-500 focus:border-gray-500"
              accept="image/*"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-800 text-sm font-medium mb-2">
            Açıklama
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-gray-500 focus:border-gray-500"
            rows="4"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition duration-300"
          >
            Güncelle
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
