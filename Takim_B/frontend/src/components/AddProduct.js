import React, { useState } from "react";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productId, setproductId] = useState("");  
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form gönderimi işlemleri burada yapılabilir
    console.log({
      productName,
      productId,
      price,
      category,
      image,
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ürün Ekle</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 text-sm font-medium mb-2">
            Ürün Adı
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        
        <div className="mb-4">
  <label htmlFor="barcode" className="block text-gray-700 text-sm font-medium mb-2">
   Barcod-no
  </label>
  <input
    type="number"
    id="barcode"
    value={productId}
    onChange={(e) => setproductId(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded"
    required
  />
</div>
        

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-2">
            Fiyat
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">
            Kategori
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Kategori Seçin</option>
            <option value="">Meyve,Sebze</option>
            <option value="">Et, Şarküteri</option>
            <option value="">Atıştırmalık</option>
            {/* Diğer kategoriler */}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-medium mb-2">
            Ürün Resmi
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded"
            accept="image/*"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ekle
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;