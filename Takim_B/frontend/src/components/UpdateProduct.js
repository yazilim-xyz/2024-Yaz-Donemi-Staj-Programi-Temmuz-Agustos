import React, { useState } from "react";
const UpdateProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Ürün güncelleme işlemleri burada yapılır
      console.log('Ürün güncellendi:', { productName, price, category, description });
    };
  
    return (
      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Ürün Güncelle</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
              Ürün Adı
            </label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Fiyat
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Kategori
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Açıklama
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Güncelle
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default UpdateProduct;