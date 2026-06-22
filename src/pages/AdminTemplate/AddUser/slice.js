import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

const initialState = {
  loading: false,
  data: null,
  error: false,
};
// prefix, asynce funtion
export const addUserService = createAsyncThunk(
  "addUserService",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.post("QuanLyNguoiDung/ThemNguoiDung", user);
      console.log("API response", response);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const addUserState = createSlice({
  initialState,
  name: "addUserSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addUserService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUserService.fulfilled, (state, action) => {
      ((state.loading = false),
        (state.data = action.payload),
        (state.error = null));
    });
    builder.addCase(addUserService.rejected, (state, action) => {
      ((state.loading = false),
        (state.data = null),
        (state.error = action.payload));
    });
  },
});
export default addUserState.reducer;
