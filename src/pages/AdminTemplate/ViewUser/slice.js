import { data } from "react-router-dom";
import api from "../../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
  error: null,
  deleteLoading: false,
};
/*
createAsyncThunk(typePrefix, payloadCreator)
payloadCreator có dạng: async (arg, thunkAPI) => {}
arg là object {page =1, keyword=""}
async (arg, { rejectWithValue }) => {
  const page = arg.page ?? 1;
  const keyword = arg.keyword ?? "";
}
  {page, keyword}=arg
page: 1 → dùng khi tạo object.
page = 1 → dùng khi destructuring object và gán giá trị mặc định.
nên khi dispatch gọi getUserListPagination thì truyền index+1 vô làm tham số
 */
export const getUserListPagination = createAsyncThunk(
  "getUserListPagination",
  async ({ page = 1, keyword = ""}, { rejectWithValue }) => {
    try {
      let response;
      if (keyword.trim()) {
        response = await api.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP01&tuKhoa=${keyword}&soTrang=${page}&soPhanTuTrenTrang=10`,
        );
      } else {
        response = await api.get(
          `QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=10`,
        );
      }
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (taiKhoan, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
      );
      console.log("response", response);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
const getUserPaginationState = createSlice({
  initialState,
  name: "getUserPaginationReducer",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserListPagination.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserListPagination.fulfilled, (state, action) => {
      state.loading = false;
      // console.log(action.payload);
      state.data = action.payload.items;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(getUserListPagination.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload;
    });
  },
});

export default getUserPaginationState.reducer;
