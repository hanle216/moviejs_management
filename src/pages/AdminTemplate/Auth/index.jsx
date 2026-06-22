import { useState } from "react";
import api from "../../../services/api";
import { Navigate } from "react-router-dom";
import { authLogin } from "./slice";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
//  const navigate = useNavigate();
  const dispatch = useDispatch();
  // lấy dữ liệu từ server xuống
  const state = useSelector((state) => state.authReducer);
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [validation, setValidation] = useState({
    // cần phải đồng bộ tên thuộc tính với object user
    taiKhoan: "",
    matKhau: "",
  });

  const handleOnchange = (event) => {
    // console.log(event.target.name, event.target.value);
    // name dùng để biết được value đó thuộc thẻ input nào
    const { name, value } = event.target;
    //  console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };
  // console.log("User", user);

  const [disabled, setDisable] = useState(true);

  const handleValidation = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    if (value.trim() === "") {
      let message = `${name} is a required field.`;
      setValidation({
        ...validation,
        [name]: message,
      });
    } else {
      setValidation({
        ...validation,
        [name]: "",
      });
    }
    setDisable(!user.taiKhoan || !user.matKhau);
  };
  // console.log("Validation", validation);

  const handlesubmit = async (event) => {
    // Chặn trang web tự động reload khi submit form
    event.preventDefault();
    //console.log("User:", user);

    dispatch(authLogin(user));
  };
  if(state.data){
    return <Navigate to="/admin/dashboard" />
  }
  return (
    <div>
      <h1>Authencication</h1>
      <div className="conatainer">
        {/* Hiển thị lỗi từ API */}
        {state.error && (
          <div className="alert alert-danger w-25 mx-auto text-center">
            {state.error.response.data.content}
          </div>
        )}

        <div className="row">
          <div className="col-6 mx-auto">
            <form onSubmit={handlesubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  name="taiKhoan" /* tên của name phải đồng bộ với thuộc tính trong object user của state */
                  onChange={handleOnchange}
                  onBlur={
                    handleValidation
                  } /* onBlur: click vô input field sau đó click ra ngoài */
                  type="text"
                  className="form-control"
                  placeholder=""
                />
              </div>
              {validation.taiKhoan && (
                <div className="alert alert-danger">{validation.taiKhoan}</div>
              )}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  name="matKhau"
                  onChange={handleOnchange}
                  onBlur={handleValidation}
                  type="password"
                  className="form-control"
                  placeholder=""
                />
              </div>
              {validation.matKhau && (
                <div className="alert alert-danger">{validation.matKhau}</div>
              )}
              <button disabled={disabled} className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
