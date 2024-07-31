import React from 'react';

const products = {
  'All': [
    { id: 1, name: 'Product 1', price: 29 },
    { id: 2, name: 'Product 2', price: 39 },
    { id: 3, name: 'Product 2', price: 39 },
    { id: 4, name: 'Product 2', price: 39 },
    { id: 5, name: 'Product 2', price: 39 },
    { id: 6, name: 'Product 2', price: 39 },
    { id: 7, name: 'Product 2', price: 39 },


    
  ],
  'Meyve, Sebze': [
    { id: 3, name: 'Elma', price: 5 },
    { id: 4, name: 'Armut', price: 2 },
    { id: 5, name: 'Çilek', price: 30 },
    { id: 6, name: 'Patates', price: 30 },
    { id: 7, name: 'Salatalık', price: 30 },
    { id: 8, name: 'Domates', price: 30 },
    { id: 9, name: 'Karpuz', price: 30 },
    { id: 10, name: 'Mandalina', price: 30 },
    { id: 11, name: 'Kavun', price: 30 },
    { id: 12, name: 'Soğan', price: 30 },
    { id: 13, name: 'Fasulye', price: 30 },
    { id: 14, name: 'Erik', price: 30 },
  ],
  'Et, Şarküteri': [
    { id: 15, name: 'Biftek', price: 50 },
    { id: 16, name: 'Tavuk', price: 30 },
    { id: 17, name: 'Dana Eti', price: 30 },
    { id: 18, name: 'Kuzu Eti', price: 30 },
    { id: 19, name: 'Salam', price: 30 },
    { id: 20, name: 'Sucuk', price: 30 },
    { id: 21, name: 'Sosis', price: 30 },
    { id: 22, name: 'Pastırma', price: 30 },
    { id: 23, name: 'Jambon', price: 30 },
    { id: 24, name: 'Füme Etler', price: 30 },
    { id: 25, name: 'Kıyma', price: 30 },
    { id: 26, name: 'Kuşbaşı', price: 30 },
  ],
 'Atıştırmalık': [
     { id: 27, name: 'Çerez', price: 50 },
     { id: 28, name: 'Bisküvi', price: 30 },
     { id: 29, name: 'Çekirdek', price: 30 },
     { id: 30, name: 'Cips', price: 30 },
     { id: 31, name: 'Çikolata', price: 30 },
     { id: 32, name: 'Şekerleme', price: 30 },
     { id: 33, name: 'Kuruyemiş', price: 30 },
     { id: 34, name: 'Kurabiye', price: 30 },
     { id: 35, name: 'Kek', price: 30 },
     { id: 36, name: 'Kraker', price: 30 },
     { id: 37, name: 'Çizi', price: 30 },
     { id: 38, name: 'Meyve Kuruları', price: 30 },
    
   ],
  'Kuruyemiş': [
     { id: 39, name: 'Fındık', price: 50 },
     { id: 40, name: 'Fıstık', price: 30 },
     { id: 41, name: 'Badem', price: 30 },
     { id: 42, name: 'Ceviz', price: 30 },
     { id: 43, name: 'Antep Fıstığı', price: 30 },
     { id: 44, name: 'Kaju', price: 30 },
     { id: 45, name: 'Beyaz Leblebi', price: 30 },
     { id: 46, name: 'Sarı Leblebi', price: 30 },
     { id: 47, name: 'Çekirdek', price: 30 },
     { id: 48, name: 'Karışık Kuruyemiş', price: 30 },
     { id: 49, name: 'Kuru Meyveler', price: 30 },
     { id: 50, name: 'Lokum', price: 30 },
    
   ], 

   'İçecekler': [
     { id: 51, name: 'Çay', price: 50 },
     { id: 52, name: 'Kahve', price: 30 },
     { id: 53, name: 'Portakal Suyu', price: 30 },
     { id: 54, name: 'Elma Suyu', price: 30 },
     { id: 55, name: 'Soda', price: 30 },
     { id: 56, name: 'Ayran', price: 30 },
     { id: 57, name: 'Kola', price: 30 },
     { id: 58, name: 'Gazoz', price: 30 },
     { id: 59, name: 'Limonata', price: 30 },
     { id: 60, name: 'Şalgam', price: 30 },
     { id: 61, name: 'Soğuk Çay', price: 30 },
     { id: 62, name: 'Maden Suyu', price: 30 },
],

   'Glutensiz Ürünler': [
     { id: 63, name: 'Karabuğday Unu', price: 50 },
     { id: 64, name: 'Pirina', price: 30 },
     { id: 65, name: 'Mısır Unu', price: 30 },
     { id: 66, name: 'Kinoa', price: 30 },
     { id: 67, name: 'Amarant', price: 30 },
     { id: 68, name: 'Teff', price: 30 },
     { id: 69, name: 'Gluten-Free Ekmek', price: 30 },
     { id: 70, name: 'Gluten-Free Makarnalar', price: 30 },
     { id: 71, name: 'Gluten-Free Enerji Barları', price: 30 },
     { id: 72, name: 'Gluten-Free Müsli ve Yulaf', price: 30 },
     { id: 73, name: 'Gluten-Free Soslar', price: 30 },
     { id: 74, name: 'Su ve Maden Suyu', price: 30 },
    
   ], 

   'Kahvaltılık Ürünler': [
     { id: 75, name: 'Peynir', price: 50 },
     { id: 76, name: 'Zeytin', price: 30 },
     { id: 77, name: 'Reçel', price: 30 },
     { id: 78, name: 'Bal', price: 30 },
     { id: 79, name: 'Tereyağı', price: 30 },
     { id: 80, name: 'Margin', price: 30 },
     { id: 81, name: 'Yumurta', price: 30 },
     { id: 82, name: 'Simit', price: 30 },
     { id: 83, name: 'Poğaça', price: 30 },
     { id: 84, name: 'Sosis', price: 30 },
     { id: 85, name: 'Salam', price: 30 },
     { id: 86, name: 'Ekmek', price: 30 },
    
   ], 

   'Sağlık,Bakım': [
     { id: 87, name: 'Sabun', price: 50 },
     { id: 88, name: 'Şampuan', price: 30 },
     { id: 89, name: 'Diş Macunu', price: 30 },
     { id: 90, name: 'Diş Fırçası', price: 30 },
     { id: 91, name: 'Yüz Temizleme Jeli', price: 30 },
     { id: 92, name: 'Nemlendirici Kremler', price: 30 },
     { id: 93, name: 'Yüz Maskeleri', price: 30 },
     { id: 94, name: 'Deodorant', price: 30 },
     { id: 95, name: 'Güneş Kremi', price: 30 },
     { id: 96, name: 'Losyon', price: 30 },
     { id: 97, name: 'Vitaminler ve Takviyeler', price: 30 },
     { id: 98, name: 'Ağrı Kesici,İlaç', price: 30 },
   
    ], 

   'Temizlik': [
     { id: 99, name: 'Sıvı Temizlik Deterjanı', price: 50 },
     { id: 100, name: 'Bulaşık Deterjanı', price: 30 },
     { id: 101, name: 'Yüzey Temizleme Spreyi', price: 30 },
     { id: 102, name: 'Cam Temizleme Spreyi', price: 30 },
     { id: 103, name: 'Yer Temizleme Deterjanı', price: 30 },
     { id: 104, name: 'Çamaşır Deterjanı', price: 30 },
     { id: 105, name: 'Mikrofiber Temizlik Bezleri', price: 30 },
     { id: 106, name: 'Oda Spreyi', price: 30 },
     { id: 107, name: 'Cam temizleyici', price: 30 },
     { id: 108, name: 'Paspas', price: 30 },
     { id: 109, name: 'Süpürge', price: 30 },
     { id: 110, name: 'Fırça', price: 30 },
    
   ], 
  };

const ProductList = ({category, darkMode }) => {
  const selectedProducts = products[category] || [];


  return (
    <div className={`p-4 rounded shadow max-h-[calc(100vh-8rem)] overflow-y-auto ${darkMode ? 'bg-primary' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Ürünler &gt; {category}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {selectedProducts.map(product => (
          <div key={product.id} className={`border p-4 rounded shadow-sm ${darkMode ? 'bg-white text-black' : 'bg-primary text-white'}`}>
          <div className="w-full h-40 bg-gray-200"></div>
          <h3 className="font-semibold">{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
