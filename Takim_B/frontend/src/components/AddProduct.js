import React, { useState } from "react";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productId, setproductId] = useState("");  
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1); // Ürün adeti için state ekleyin
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form gönderimi işlemleri burada yapılabilir
    console.log({
      productName,
      productId,
      price,
      category,
      quantity,
      image,
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ürün Ekle</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
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

          <div>
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

          <div>
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

          <div>
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
            <label htmlFor="quantity" className="block text-gray-700 text-sm font-medium mb-2">
              Adet
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              min="1"
              required
            />
          </div>

          <div>
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