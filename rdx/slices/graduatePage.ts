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

import { getUserToken } from "helpers/get-user-token";


export const fetchGraduatePage = createAsyncThunk(
  "graduatePage/fetch",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      // const response = await axios.get('/api/graduate-page-data', {...params, access_token})
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
    builder.addCase(fetchGraduatePage.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchGraduatePage.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.pageData = action.payload;
    });
    builder.addCase(fetchGraduatePage.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = graduatePageSlice.actions;
