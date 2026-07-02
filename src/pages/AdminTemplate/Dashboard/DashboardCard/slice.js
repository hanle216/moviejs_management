import { data } from "react-router-dom";
import api from "../../../../services/api";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  totalUsers: 0,
  totalMovies: 0,
  totalTheatres: 0,
  totalRoles: 0,
  error: null,
};
const getDashboardSlice = createSlice({
  initialState,
  name: "getDashboardReducer",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.totalUsers = action.payload.totalUsers;
        state.totalMovies = action.payload.totalMovies;
        state.totalTheatres = action.payload.totalTheatres;
        state.totalRoles = action.payload.totalRoles;
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const getDashboard = createAsyncThunk(
  "getDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const [usersRes, moviesRes, theatersRes, rolesRes] = await Promise.all([
        api.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"),
        api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01"),
        api.get("QuanLyRap/LayThongTinHeThongRap"),
        api.get("QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"),
      ]);
      return {
        totalUsers: usersRes.data.content.length,
        totalMovies: moviesRes.data.content.length,
        totalTheatres: theatersRes.data.content.length,
        totalRoles: rolesRes.data.content.length,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export default getDashboardSlice.reducer;
