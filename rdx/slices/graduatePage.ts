import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, Step, GraduatePageState } from "../types";
import { getUserToken } from "helpers/user-token";

export const getGraduatesByCondition = createAsyncThunk(
  "graduatePage/getGraduatesByCondition",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      let endpoint = `/stats/graduates-by-condition.json`;
      if (params?.universityCountries)
        endpoint += `?universityCountries=${params.universityCountries}`;
      if (params?.locationUuid)
        endpoint += `&locationUuid=${params.locationUuid}`;

      const response = await axios.get(`/api/entry`, {
        params: { endpoint, access_token },
      });
      return response.data.graduates;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTotalGraduates = createAsyncThunk(
  "graduatePage/getTotalGraduates",
  async (_, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const endpoint = "/stats/graduates-by-condition.json";
      const response = await axios.get(`/api/entry`, {
        params: { endpoint, access_token },
      });
      return response.data.graduates;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/********************************** */
const initialState: GraduatePageState = {
  status: Status.IDLE,
  graduateStatsByCondition: [],
  totalGraduateStats: [],
  error: null,
};

export const graduatePageSlice = createSlice({
  name: "graduatePage",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getGraduatesByCondition.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(getGraduatesByCondition.fulfilled, (state, action) => {
      state.graduateStatsByCondition = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(getGraduatesByCondition.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(getTotalGraduates.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(getTotalGraduates.fulfilled, (state, action) => {
      state.totalGraduateStats = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(getTotalGraduates.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = graduatePageSlice.actions;
