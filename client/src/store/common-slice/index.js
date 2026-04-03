import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

// Fetch Feature Images Thunk
export const getFeatureImages = createAsyncThunk(
  "/feature/getFeatureImages", // ✅ Yahan naam theek kar diya hai
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/common/feature/get`
    );

    return response.data;
  }
);

// Add Feature Image Thunk
export const addFeatureImage = createAsyncThunk(
  "/feature/addFeatureImage", // ✅ Yahan naam theek kar diya hai
  async (image) => {
    const response = await axios.post(
      `http://localhost:5000/api/common/feature/add`,
      { image } // ✅ Sahi fix: curly braces zaroori hain!
    );

    return response.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;