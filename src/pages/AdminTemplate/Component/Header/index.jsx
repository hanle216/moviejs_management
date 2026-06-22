import React from "react";
import { useNavigate } from "react-router-dom";
import { actionLogout } from "../../Auth/slice";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(actionLogout());
    navigate("/auth");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4 shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          🎬 Admin Management
        </span>

        <div className="d-flex align-items-center">
          <span className="text-light me-3">
            Hello, <strong>Admin</strong>
          </span>

          <button
            className="btn btn-outline-light"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;