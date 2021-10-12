import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, GraduatePageState } from "../types";

//mock data
import { users, articles, personalities, institutions, videos } from "data/village";

export const fetchGraduatePageData = createAsyncThunk(
  "graduatePage/fetchData",
  async (params: any, thunkAPI) => {
    try {
      // const response = await axios.get('/api/graduate-page-data', {params: params})
      // return response.data.graduatePageData; // data: {graduatePageData: []}

      return {
        totalGraduates: users.filter((item)=>item.graduatedAt),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/************************************* */
const initialState: GraduatePageState = {
  status: Status.IDLE,
  pageData: {
    totalGraduates: [],
  },
  error: null,
};

export const graduatePageSlice = createSlice({
  name: "graduatePage",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGraduatePageData.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchGraduatePageData.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.pageData = action.payload;
    });
    builder.addCase(fetchGraduatePageData.rejected, (state, action) => {
      // state.error = (
      //   action.payload as { error: string; error_description: string }
      // ).error_description;
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = graduatePageSlice.actions;
