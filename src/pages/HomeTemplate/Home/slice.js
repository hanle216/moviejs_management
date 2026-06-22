import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

const initialState = {
  loading: false,
  data: null,
  error: null,
};
export const getListMovie = createAsyncThunk(
  "getListMovie",
  async (__, { rejectWithValue }) => {
    try {
      const result = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const homeSlice = createSlice({
  initialState,
  name: "homeSlice",
  reducers: {} /* actions tự define */,
  /* actions được tạo bởi createAsyncThunk */
  extraReducers: (builder) => {
    // pending
    builder.addCase(getListMovie.pending, (state) => {
      state.loading = true;
    });
    // success
    builder.addCase(getListMovie.fulfilled, (state, action) => {
      state.loading = false;
      console.log("state", state);
      console.log("action", action);
      console.log("payload", action.payload);
      state.data = action.payload;
    });
    // failed
    builder.addCase(getListMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default homeSlice.reducer;
