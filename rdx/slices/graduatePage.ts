import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, GraduatePageState } from "../types";

import { getUserToken } from "helpers/user-token";


export const fetchGraduates = createAsyncThunk(
  "graduatePage/fetchGraduates",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get('/api/graduates', {...params, access_token})
      return response.data.graduates; // data: {graduates: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/************************************* */
const initialState: GraduatePageState = {
  status: Status.IDLE,
  totalGraduates: [],
  error: null,
};

export const graduatePageSlice = createSlice({
  name: "graduatePage",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGraduates.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchGraduates.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.totalGraduates = action.payload;
    });
    builder.addCase(fetchGraduates.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = graduatePageSlice.actions;
