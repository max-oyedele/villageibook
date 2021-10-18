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
} from "data/feed";

import { getUserToken } from "helpers/get-user-token";

export const fetchFeedPage = createAsyncThunk(
  "feedPage/fetch",
  async (_, thunkAPI) => {
    try {
      const access_token = getUserToken();
      // const response = await axios.get('/api/feed-page-data', {access_token})
      // return response.data.villagePageData; // data: {feedPageData: []}

      return {
        posts,
        recentVillages,
        recentUsers,
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
    builder.addCase(fetchFeedPage.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchFeedPage.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.pageData = action.payload;
    });
    builder.addCase(fetchFeedPage.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = feedPageSlice.actions;
