import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, Step, GraduatePageState } from "../types";
import { getUserToken } from "helpers/user-token";

export const getGraduates = createAsyncThunk(
  "graduatePage/getGraduates",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get(`/api/graduates`, {
        params: { ...params, access_token, },
      });
      return response.data.graduates;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });

/********************************** */
const initialState: GraduatePageState = {
  status: Status.IDLE,  
  graduates: [],
  error: null,
};

export const graduatePageSlice = createSlice({
  name: "graduatePage",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getGraduates.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(getGraduates.fulfilled, (state, action) => {
      state.graduates = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(getGraduates.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = graduatePageSlice.actions;
