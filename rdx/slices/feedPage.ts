import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, FeedPageState } from "../types";

import { getUserToken } from "helpers/user-token";

export const fetchFeedPosts = createAsyncThunk(
  "feedPage/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get("/api/feed/posts", {
        params: { access_token },
      });
      return response.data.posts;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchRecentVillages = createAsyncThunk(
  "feedPage/fetchRecentVillages",
  async (_, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get("/api/feed/recentVillages", {
        params: { access_token },
      });
      return response.data.villages;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchRecentUsers = createAsyncThunk(
  "feedPage/fetchRecentUsers",
  async (_, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get("/api/feed/recentUsers", {
        params: { access_token },
      });
      return response.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/************************************* */
const initialState: FeedPageState = {
  status: Status.IDLE,
  posts: [],
  recentVillages: [],
  recentUsers: [],
  error: null,
};

export const feedPageSlice = createSlice({
  name: "feedPage",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeedPosts.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchFeedPosts.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.posts = action.payload;
    });
    builder.addCase(fetchFeedPosts.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchRecentVillages.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchRecentVillages.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.recentVillages = action.payload;
    });
    builder.addCase(fetchRecentVillages.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchRecentUsers.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchRecentUsers.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.recentUsers = action.payload;
    });
    builder.addCase(fetchRecentUsers.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = feedPageSlice.actions;
