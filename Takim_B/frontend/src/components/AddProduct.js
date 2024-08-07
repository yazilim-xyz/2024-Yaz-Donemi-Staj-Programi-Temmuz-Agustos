import React, { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs } from '../service/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { generateUniqueBarcode } from '../service/productService'; 
function AddProduct() {
  const [productName, setProductName] = useState("");
  const [barcodeId, setBarcodeId] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const fetchedCategories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Hata oluştu: ", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBarcode = await generateUniqueBarcode(); // Generate a unique barcode

      let imageUrl = null;

      if (image) {
        const storage = getStorage();
        const imageRef = ref(storage, `product_images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }


      await addDoc(collection(db, 'products'), {
        productName,
        barcodeId: newBarcode, // Use the unique barcode,
        price,
        category,
        quantity,
        image: imageUrl || "",
      });

      alert('Ürün başarıyla eklendi!');

      setProductName('');
      setPrice('');
      setCategory('');
      setQuantity(1);
      setImage(null);
    } catch (error) {
      console.error('Ürün eklenirken hata oluştu: ', error);
    }
  };

  return (
    <div className="mt-20 p-6 max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 mb-16">Ürün Ekle</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label htmlFor="productName" className="block text-gray-800 text-sm font-medium mb-2">
              Ürün Adı
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              placeholder="Ürün Adı"
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-3 border-b-2 border-gray-300"
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
              placeholder="Ürün Barkod No"
              onChange={(e) => setBarcodeId(e.target.value)}
              className="w-full p-3 border-b-2 border-gray-300"
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
              placeholder="Fiyat"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border-b-2 border-gray-300"
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
              placeholder="Kategori"
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border-b-2 border-gray-300"
              required
            >
              <option value="" className="text-gray-500 rounded-2xl">Kategori Seçin</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
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
              placeholder="Ürün Adet"
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-3 border-b-2 border-gray-300"
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
              className="w-full p-3 border-b-2 border-gray-300"
              accept="image/*"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Ekle
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddProduct;

