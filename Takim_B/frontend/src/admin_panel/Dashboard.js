import React,{useState} from 'react';
import ProductTable from './ProductTable';
import Categories from './Categories';
const Dashboard = ({ totalProducts, totalCategories }) => {

  const [activePage, setActivePage] = useState(''); // Aktif sayfayı takip eder

  const handleClick = (page) => {
    setActivePage(page); // Tıklanan sayfayı aktif sayfa olarak ayarlar
  };

  if (activePage) {
    // Aktif sayfa varsa sadece ilgili içerik gösterilir
    return (
      <div className="p-5">
        {activePage === 'productTable' && <ProductTable />}
        {activePage === 'categories-admin' && <Categories />}
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex flex-wrap justify-center gap-6">
        {/* Additional Card 1 */}
        <div  onClick={() => handleClick('categories-admin')} className="flex-1 min-w-[250px] max-w-[300px] p-6 bg-yellow  bg-opacity-90  shadow-md border border-gray-300 rounded-lg">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Toplam Kategori Sayısı</h2>
            <p className="text-4xl font-bold text-white">9</p>
          </div>
        </div>

        {/* Total Categories Card */}
        <div onClick={() => handleClick('productTable')} className="flex-1 min-w-[250px] max-w-[300px] p-6 bg-pink  bg-opacity-90  shadow-md border border-gray-300 rounded-lg">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Toplam ürün sayısı</h2>
            <p className="text-4xl font-bold text-white">{totalCategories}10</p>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="flex-1 min-w-[250px] max-w-[300px] p-6 bg-blue  bg-opacity-90  shadow-md border border-gray-300 rounded-lg">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Biten Ürünler</h2>
            <p className="text-4xl font-bold text-white">{totalProducts}5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
