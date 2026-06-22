import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetail } from "./slice";
import Loader from "../Component/Loader";
/* Khi người dùng vào trang Movie Detail, Component dùng dispatch(getMovieDetail(maPhim)) để yêu cầu Redux đi lấy dữ liệu phim từ API. Sau khi API trả dữ liệu về, Reducer trong Slice sẽ lưu dữ liệu đó vào Store. Component dùng useSelector() để theo dõi dữ liệu trong Store, nên khi Store thay đổi, React sẽ tự động render lại và hiển thị thông tin phim lên giao diện. */
const MovieDetail = () => {
  // dùng hook useParams để lấy maPhim
  // Lưu ý: param từ url có tên là gì -> useParams sẽ lấy theo tên đó
  // url có /detail/:maPhim thì useParams sẽ lấy maPhim
  const { maPhim } = useParams();
  // thường call API sẽ có 3 state: loading, data (phim, user,...), error
  // const [phim, setPhim] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const state = useSelector((state) => state.movieDetailReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieDetail(maPhim));
    // B1: call API
    // const getMovieDetail = async () => {
    //   try {
    //     // loading: true để đợi API trả về data
    //     setLoading(true);
    //     // call API lấy chi tiết phim theo mã phim
    //     const result = await api.get(
    //       `QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
    //     );
    //     // B2: lưu data vào state
    //     console.log(result.data);
    //     setPhim(result.data.content);
    //     // loading: false để ẩn loading đi
    //     setLoading(false);
    //   } catch (error) {
    //     setError(error);
    //     setLoading(false);
    //   }
    // };

    // getMovieDetail();
  }, [maPhim]); // mỗi khi thay đổi maPhim sẽ call api lại
  // báo cho user biết đang chờ API
  if (state.loading) {
    return <Loader />;
  }
  // convert link trailer youtube thành dạng nhúng iframe
  const trailerEmbed = state.data?.trailer?.replace("watch?v=", "embed/");
  return (
    // Lưu ý: thêm ? sau state phim để tránh lỗi khi chưa có data mà đã render phim
    <div className="container py-4">
      {/* THÔNG TIN PHIM */}
      <div className="row g-4">
        {/* Cột trái: Poster */}
        <div className="col-md-4">
          <img
            src={state.data?.hinhAnh}
            alt={state.data?.tenPhim}
            className="img-fluid rounded shadow"
          />
        </div>
        {/* Cột phải: Chi tiết */}
        <div className="col-md-8">
          <h2 className="fw-bold">{state.data?.tenPhim}</h2>
          {/* Badges trạng thái */}
          <div className="mb-3">
            {/* Với dữ liệu boolean -> toán tử ba ngôi hoặc () && () */}
            {state.data?.hot && (
              <span className="badge bg-danger me-2">🔥 HOT</span>
            )}
            {state.data?.dangChieu && (
              <span className="badge bg-success me-2">Đang chiếu</span>
            )}
            {state.data?.sapChieu && (
              <span className="badge bg-warning text-dark">Sắp chiếu</span>
            )}
          </div>
          {/* Bảng thông tin */}
          <table className="table table-bordered w-auto mb-3">
            <tbody>
              <tr>
                <th>Mã phim</th>
                <td>{state.data?.maPhim}</td>
              </tr>
              <tr>
                <th>Nhóm</th>
                <td>{state.data?.maNhom}</td>
              </tr>
              <tr>
                <th>Khởi chiếu</th>
                {/* convert "2024-10-10T00:00:00" to "10/10/2024" */}
                <td>
                  {new Date(state.data?.ngayKhoiChieu).toLocaleDateString(
                    "vi-VN",
                  )}
                </td>
              </tr>
              <tr>
                <th>Đánh giá</th>
                <td>⭐ {state.data?.danhGia}</td>
              </tr>
            </tbody>
          </table>
          {/* Mô tả */}
          <p className="text-muted">Nội dung đang được cập nhật...</p>
          {/* Nút hành động */}
          <a href="#trailer" className="btn btn-danger me-2">
            ▶ Xem Trailer
          </a>
          <button className="btn btn-outline-secondary">🎟 Đặt vé ngay</button>
        </div>
      </div>
      <hr className="my-4" />
      {/* TRAILER */}
      <h5 className="fw-bold mb-3">Trailer chính thức</h5>
      <div className="ratio ratio-16x9 w-50" id="trailer">
        <iframe
          src={trailerEmbed}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
};

export default MovieDetail;
