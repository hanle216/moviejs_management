import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserService } from "./slice";
import Loader from "../../../components/Loader";

export default function AddUser() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.addUserReducer); // gọi tên tên mà mình compile bên store
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });
  // event giúp lấy được name và value
  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user, // clone lại tất cả thông tin ban đầu mà user có
      [name]: value,
    });
  };
   console.log("User", user);

  const handleAddUser = (event) => {
    event.preventDefault();
    dispatch(addUserService(user));
  };
  if (state.loading) {
    return <Loader />;
  }
  return (
    <div className="container py-4">
      <h4 className="mb-4 fw-bold">Thêm người dùng</h4>

      <div className="row">
        <div className="col-md-7">
          {/* Thông báo thành công */}
          {state.data && (
            <div className="alert alert-success">Add user sucessfully</div>
          )}

          {/* Thông báo lỗi */}
          {state.error && (
            <div className="alert alert-danger">
              {state.error.response.data.content}
            </div>
          )}

          <form onSubmit={handleAddUser}>
            {/* Tài khoản */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Tài khoản</label>
              <input
                name="taiKhoan"
                type="text"
                className="form-control"
                placeholder="Nhập tài khoản"
                onChange={handleOnchange}
              />
            </div>

            {/* Mật khẩu */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Mật khẩu</label>
              <input
                name="matKhau"
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu"
                onChange={handleOnchange}
              />
            </div>

            {/* Họ tên */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Họ tên</label>
              <input
                name="hoTen"
                type="text"
                className="form-control"
                placeholder="Nhập họ tên"
                onChange={handleOnchange}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Nhập email"
                onChange={handleOnchange}
              />
            </div>

            {/* Số điện thoại */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Số điện thoại</label>
              <input
                name="soDt"
                type="text"
                className="form-control"
                placeholder="Nhập số điện thoại"
                onChange={handleOnchange}
              />
            </div>

            {/* Mã nhóm */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Mã nhóm</label>
              <input
                name="maNhom"
                type="text"
                className="form-control"
                onChange={handleOnchange}
              />
            </div>

            {/* Loại người dùng — dùng select cho dễ chọn */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Loại người dùng</label>
              <select
                name="maLoaiNguoiDung"
                className="form-select"
                onChange={handleOnchange}
              >
                <option value="KhachHang">Khách hàng</option>
                <option value="QuanTri">Quản trị</option>
              </select>
            </div>

            {/* Nút submit */}
            <button type="submit" className="btn btn-primary">
              Thêm người dùng
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
