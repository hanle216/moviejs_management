import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ minHeight: "100vh", width: "250px" }}
    >
      <h4 className="mb-4">🎬 Movies</h4>

      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/admin/dashboard" className="nav-link text-white">
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item mt-3">
          <h6 className="text-secondary">Users</h6>
        </li>

        <li className="nav-item">
          <NavLink to="/admin/view-user" className="nav-link text-white">
            User List
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/admin/add-user" className="nav-link text-white">
            Add User
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
