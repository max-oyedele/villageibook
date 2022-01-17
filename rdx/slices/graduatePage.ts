import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axiosAuth from "libs/axios-auth";

import { Status, Step, GraduatePageState } from "../types";

export const fetchGraduateStats = createAsyncThunk(
  "graduatePage/fetchGraduateStats",
  async (params: any, thunkAPI) => {
    try {
      const homeCountry = 'bangladesh';
      const universityCountries = 'australia,bangladesh,canada,eu,united-kingdom,united-states';
      let endpoint = `/stats/graduates-by-location.json?type=${params.type}&home=${homeCountry}&universityCountries=${universityCountries}`;

      const response = await axiosAuth.get(`/api/entry`, {
        params: { endpoint },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/********************************** */
const initialState: GraduatePageState = {
  status: Status.IDLE,
  graduateStats: {},
  error: null,
};

export const graduatePageSlice = createSlice({
  name: "graduatePage",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGraduateStats.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchGraduateStats.fulfilled, (state, action) => {      
      state.graduateStats[action.meta.arg.type] = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(fetchGraduateStats.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });    
  },
});

export const { reset } = graduatePageSlice.actions;
