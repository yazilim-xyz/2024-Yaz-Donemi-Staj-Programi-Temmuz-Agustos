import React, { useState }from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/modal/UpdateProductModal";
import AdminCategoryPage from "./Categories";
import ProductTable from "./ProductTable";
import Dashboard from "./Dashboard";
import StockTrackink from "./StockTracking";
function MainAdmin() {
  const [activePage, setActivePage] = useState('dashboard'); 
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode); // This should be a function
  };
  const renderContent = () => {
    switch (activePage) {
      case 'addProduct':
        return <AddProduct />;
      case 'update-product':
        return <UpdateProduct />;
        case 'categories-admin':
          return <AdminCategoryPage />;
        case 'productTable':
          return <ProductTable />;
          case 'stock-tracking':
            return <StockTrackink/>
          
  
      // Başka sayfalar eklenebilir
      default:
        return <div className="w-full h-full flex justify-center"><Dashboard></Dashboard></div>; // Varsayılan içerik
    }
  };

  return (
    <div className="flex flex-col min-h-screen
     bg-gray-100 ">
    <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
    <div className="flex flex-1">
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      {renderContent()}
    </div>
  </div>
  );
}

export default MainAdmin;