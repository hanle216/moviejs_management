import { use, useEffect, useState } from "react";
import axios from "axios";
import Movie from "../Component/Movie";
import Loader from "../Component/Loader";
import api from "../../../services/api";
import { getListMovie } from "./slice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  // loading: chờ server lấy dữ liệu
  // data: chứa data server trả xuống
  // error: nếu lỗi thì in ra ở catch
  
  // console.log(state);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.homeReducer);
  useEffect(() => {
    // const getListMovie = async () => {
    //   try {
    //     // pending -> update loading: true
    //     setState({
    //       ...state /* clone những thuộc tính ban đầu của state */,
    //       loading: true /* cập nhật thuộc tính loading trong state */,
    //     });
    //     const result = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
    //     //  console.log("result:", result.data.content);
    //     // success
    //     setState({
    //       ...state,
    //       loading: false,
    //       data: result.data.content,
    //     });
    //   } catch (error) {
    //     // fail
    //     setState({
    //       ...state,
    //       loading: false,
    //       error: error,
    //     });
    //     console.log(error);
    //   }
    // };
    // getListMovie();
    dispatch(getListMovie());
  }, []);
  const renderListMovie = () => {
    const { data } = state;
    if (data) {
      return data.map((item) => {
        return <Movie key={item.maPhim} movie={item} />;
      });
    }
  };
  if (state.loading) {
    return <Loader />;
  }
  return (
    <div>
      <h1>Home</h1>
      <div className="container">
        <div className="row">{renderListMovie()}</div>
      </div>
    </div>
  );
};

export default Home;
