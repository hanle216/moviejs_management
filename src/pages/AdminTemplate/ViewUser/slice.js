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
};
export const getUserListPagination = createAsyncThunk(
  "getUserListPagination",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=1&soPhanTuTrenTrang=10`,
      );
      console.log("response list user pagination:", response);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
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
      console.log(action.payload);
    });
    builder.addCase(getUserListPagination.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default getUserPaginationState.reducer;
