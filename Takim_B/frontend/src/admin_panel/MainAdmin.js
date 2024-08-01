import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Navbar from "./Navbar";


function MainAdmin() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
    <Navbar />
    <div className="flex flex-1">
      <Sidebar />
      <Content />
    </div>
  </div>
  );
}

export default MainAdmin;