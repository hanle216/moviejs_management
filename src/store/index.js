import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./../pages/HomeTemplate/Home/slice";
import authReducer from "./../pages/AdminTemplate/Auth/slice";
import addUserReducer from "./../pages/AdminTemplate/AddUser/slice";
import movieDetailReducer from "./..//pages/HomeTemplate/MovieDetail/slice";
import getUserListPaginationReducer from "../pages/AdminTemplate/ViewUser/slice";
import getDashboardReducer from "../pages/AdminTemplate/Dashboard/DashboardCard/slice";
const store = configureStore({
  reducer: {
    //child reducer
    homeReducer,
    authReducer,
    addUserReducer,
    movieDetailReducer,
    getUserListPaginationReducer,
    getDashboardReducer,
  },
});
export default store;
