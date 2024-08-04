import React, { useState }from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import AdminCategoryPage from "./Categories";
import ProductTable from "./ProductTable";
import Dashboard from "./Dashboard";
import Members from "./Members";
function MainAdmin() {
  const [activePage, setActivePage] = useState('dashboard'); // Varsayılan sayfa
 
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
          case 'kullanıcılar':
            return <Members />;
  
      // Başka sayfalar eklenebilir
      default:
        return <div className="min-h-screen"><Dashboard></Dashboard></div>; // Varsayılan içerik
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