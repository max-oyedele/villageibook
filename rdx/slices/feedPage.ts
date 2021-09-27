import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, FeedPageState } from "../types";

//mock data
import {
  posts,
  recentVillages,
  recentUsers,
  totalGraduates,
  villageGraduates,
  countryGraduates,
  bangladeshGraduates,
} from "data/feed";

export const fetchFeedPageData = createAsyncThunk(
  "feedPage/fetchData",
  async (_, thunkAPI) => {
    try {
      // const response = await axios.get('api/feed-page-data')
      // return response.data.villagePageData; // data: {feedPageData: []}

      return {
        posts,
        recentVillages,
        recentUsers,
        totalGraduates,
        villageGraduates,
        countryGraduates,
        bangladeshGraduates,        
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/************************************* */
const initialState: FeedPageState = {
  status: Status.IDLE,
  pageData: {
    posts: [],
    recentVillages: [],
    recentUsers: [],
    totalGraduates: 0,
    villageGraduates: 0,
    countryGraduates: {},
    bangladeshGraduates: {},
  },
  error: null,
};

export const feedPageSlice = createSlice({
  name: "feedPage",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeedPageData.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchFeedPageData.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.pageData = action.payload;
    });
    builder.addCase(fetchFeedPageData.rejected, (state, action) => {
      // state.error = (
      //   action.payload as { error: string; error_description: string }
      // ).error_description;
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = feedPageSlice.actions;
