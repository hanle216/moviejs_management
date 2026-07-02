import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserListPagination, deleteUser } from "./slice";
import { toast } from "react-toastify";
import { Modal } from "bootstrap";
import { data } from "react-router-dom";

const ViewUser = () => {
  const state = useSelector((state) => state.getUserListPaginationReducer);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    dispatch(getUserListPagination({ page: 1, keyword: "" }));
  }, []);

  if (state.loading) return <p>Loading....</p>;

  const handleOnChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(getUserListPagination({ page: 1, keyword: keyword }));
  };

  const handleReset = () => {
    setKeyword("");
    setRoleFilter("");
    dispatch(getUserListPagination({ page: 1, keyword: "" }));
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    const result = await dispatch(deleteUser(selectedUser.taiKhoan));
    console.log("result", result);

    if (deleteUser.fulfilled.match(result)) {
      const modal = Modal.getInstance(document.getElementById("deleteModal"));
      modal?.hide();

      setSelectedUser(null);
      // Remove backdrop
      document.body.classList.remove("modal-open");
      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
      await dispatch(
        getUserListPagination({
          page: state.currentPage,
          keyword,
        }),
      );
      toast.success(result.payload);
    } else {
      toast.error(result.payload?.content || "Xóa thất bại");
    }
  };
  const handleRoleChange = (e) => {
    setRoleFilter(e.target.value);
  };
  const filteredData = state.data?.filter((user) => {
    if (!roleFilter) return true;
    return user.maLoaiNguoiDung == roleFilter;
  });
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>User Management</h3>

        <button className="btn btn-primary">+ Add User</button>
      </div>

      {/* Search */}
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="row g-2 align-items-center">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={keyword}
                  onChange={handleOnChange}
                />
              </div>

              <div className="col-md-2">
                <button className="btn btn-outline-success w-100" type="submit">
                  Search
                </button>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-outline-success w-100"
                  type="button"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={roleFilter}
                  onChange={handleRoleChange}
                >
                  <option value="">All</option>
                  <option value="KhachHang">KhachHang</option>
                  <option value="QuanTri">QuanTri</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>User List</span>
          <small className="text-muted">
            Total: <strong>{state.totalCount}</strong>
          </small>{" "}
        </div>

        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Tài khoản</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Role</th>
                <th width="180">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredData?.map((user) => (
                <tr key={user.taiKhoan}>
                  <td>{user.taiKhoan}</td>
                  <td>{user.hoTen}</td>
                  <td>{user.email}</td>
                  <td>{user.soDt}</td>
                  <td>
                    <span
                      className={
                        user.maLoaiNguoiDung === "QuanTri"
                          ? "badge bg-danger"
                          : "badge bg-primary"
                      }
                    >
                      {user.maLoaiNguoiDung}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2">
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => setSelectedUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              {/*
              tạo mảng với độ dài =  state.totalPages
              map(tên biến, index): vì ban đầu là mảng rỗng, gọi totalPage thì có giá trị là undefine
              nên ko cần tên biến -> đặt là _
              */}
              {Array.from({ length: state.totalPages }).map((_, index) => {
                return (
                  <li
                    key={index + 1}
                    className={
                      state.currentPage === index + 1
                        ? "page-item active"
                        : "page-item"
                    }
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        dispatch(
                          getUserListPagination({ page: index + 1, keyword }),
                        )
                      }
                    >
                      {index + 1}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete User</h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">
              {selectedUser && (
                <>
                  Are you sure you want to delete user
                  <strong> {selectedUser.taiKhoan}</strong>?
                </>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>

              <button className="btn btn-danger" onClick={handleDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
