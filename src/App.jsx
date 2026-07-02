import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import HomeTemplate from "./pages/HomeTemplate";
import AdminTemplate from "./pages/AdminTemplate";
import Home from "./pages/HomeTemplate/Home/";
import ListMovie from "./pages/HomeTemplate/ListMovie";
import Contact from "./pages/HomeTemplate/Contact";
import AddUser from "./pages/AdminTemplate/AddUser";
import Dashboard from "./pages/AdminTemplate/Dashboard";
import Auth from "./pages/AdminTemplate/Auth";
import Hooks from "./pages/HomeTemplate/Hook";
import MovieDetail from "./pages/HomeTemplate/MovieDetail";
import ProtectedRoute from "./guard/protectedRoute";
import NotFound from "./pages/NotFound";
import ViewUser from "./pages/AdminTemplate/ViewUser";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route path="" element={<Home />} />
          <Route path="list-movie" element={<ListMovie />} />
          <Route path="contact" element={<Contact />} />
          <Route path="hooks" element={<Hooks />} />
          <Route path="detail/:maPhim" element={<MovieDetail />} />
        </Route>

        <Route path="admin" element={<AdminTemplate />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="view-user" element={<ViewUser />} />
        </Route>

        <Route path="auth" element={<Auth />} />
        {/* Nên để NotFound Route ở cuối */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
