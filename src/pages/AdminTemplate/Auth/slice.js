import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

// Khi reload page => xuống localStorage lấy data để nạp lên lại
const data = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  loading: false,
  data: data,
  error: null,
};
export const authLogin = createAsyncThunk(
  "authLogin",
  // cần truyền đối số user (object), dữ liệu thu thập được từ component, lấy cục user này gửi lên cho server check
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.post("QuanLyNguoiDung/DangNhap", user);
      //   console.log("response", response);
      const userData = response.data.content;
      // Check role xem có phải là KhachHang ? Nếu có thì chặn và báo lỗi
      if (userData.maLoaiNguoiDung == "KhachHang") {
        return rejectWithValue({
          response: {
            data: {
              content: "Bạn không có quyền đăng nhập",
            },
          },
        });
      }
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
const authSlice = createSlice({
  initialState: initialState,
  name: "authSlice",
  reducers: {
    clearAuth: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const actionLogout = () => {
  // đối số dispatch giúp gửi action clearAuth() vào Redux để reducer clearAuth được thực thi.
  return (dispatch) => {
    console.log("dispatch", dispatch);
    localStorage.removeItem("user");
    dispatch(authSlice.actions.clearAuth());
  };
};
export default authSlice.reducer;
