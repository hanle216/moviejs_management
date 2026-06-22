import {React, useEffect} from "react";
import { useDispatch } from "react-redux";
import { getUserListPagination } from "./slice";

const ViewUser = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUserListPagination())
  },[])

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>User Management</h3>

        <button className="btn btn-primary">
          + Add User
        </button>
      </div>

      {/* Search */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search username..."
              />
            </div>

            <div className="col-md-2">
              <button className="btn btn-success w-100">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header">
          User List
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
              {/* render user ở đây */}
            </tbody>
          </table>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button className="page-link">
                  Previous
                </button>
              </li>

              <li className="page-item active">
                <button className="page-link">
                  1
                </button>
              </li>

              <li className="page-item">
                <button className="page-link">
                  2
                </button>
              </li>

              <li className="page-item">
                <button className="page-link">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;