import React, { useState }from "react";
import Sidebar from "./Sidebar";
import Navbar from "../components/Navbar";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "./UpdateProductModal";
import AdminCategoryPage from "./Categories";
import ProductTable from "./ProductTable";
import Dashboard from "./Dashboard";
function MainAdmin() {
  const [activePage, setActivePage] = useState('dashboard'); 
 
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
          
  
      // Başka sayfalar eklenebilir
      default:
        return <div className="min-h-screen mt-8"><Dashboard></Dashboard></div>; // Varsayılan içerik
    }
  };

  return (
    <div className="flex flex-col min-h-screen
     bg-gray-100 pt-16">
    <Navbar />
    <div className="flex flex-1">
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      {renderContent()}
    </div>
  </div>
  );
}

export default MainAdmin;