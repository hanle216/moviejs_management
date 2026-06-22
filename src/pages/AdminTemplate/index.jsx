import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Sidebar from "./Component/Sidebar";

const AdminTemplate = () => {
  return (
    <>
      <Header />

      <div className="d-flex">
        <Sidebar />

        <div className="flex-grow-1 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminTemplate;
