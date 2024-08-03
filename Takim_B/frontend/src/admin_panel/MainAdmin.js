import React, { useState }from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Navbar from "./Navbar";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import AdminCategoryPage from "./Categories";
import ProductTable from "./ProductTable";
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
  
      // Başka sayfalar eklenebilir
      default:
        return <div></div>; // Varsayılan içerik
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
    <Navbar />
    <div className="flex flex-1">
      <Sidebar setActivePage={setActivePage} />
      {renderContent()}
      {/* <Content /> */}
    </div>
  </div>
  );
}

export default MainAdmin;