import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, Step, StatsState } from "../types";
import { getUserToken } from "helpers/user-token";

export const getGraduatesByLocation = createAsyncThunk(
  "stats/getGraduatesByLocation",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get(`/api/stats/graduatesByLocation`, {
        params: { ...params, access_token, },
      });
      return response.data.graduates;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });

/********************************** */
const initialState: StatsState = {
  status: Status.IDLE,
  graduatesByLocation: [],
  error: null,
};

export const statsSlice = createSlice({
  name: "stats",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getGraduatesByLocation.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(getGraduatesByLocation.fulfilled, (state, action) => {
      state.graduatesByLocation = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(getGraduatesByLocation.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = statsSlice.actions;
