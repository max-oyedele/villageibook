import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, FeedPageState } from "../types";

import { getUserToken } from "helpers/user-token";

export const fetchPosts = createAsyncThunk(
  "feedPage/fetchPosts",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const endpoint = `/posts.json?sort=lastUpdated.DESC&size=4&page=${params.page}`;
      const response = await axios.get("/api/entry", {
        params: { endpoint, access_token },
      });
      return response.data;
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
      const response = await axios.get("/api/entry", {
        params: { endpoint: "/villages.json?page=1&size=2", access_token },
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
      const response = await axios.get("/api/entry", {
        params: { endpoint: "/users.json?page=1&size=2", access_token },
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
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
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
