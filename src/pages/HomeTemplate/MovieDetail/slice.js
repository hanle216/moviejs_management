import api from "../../../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  error: null,
};
export const getMovieDetail = createAsyncThunk(
  "getMovieDetail",
  async (maPhim, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
      );
      console.log(response);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
const movieDetailSlice = createSlice({
  initialState: initialState,
  name: "movieDetailSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMovieDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getMovieDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default movieDetailSlice.reducer;
