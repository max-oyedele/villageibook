import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";
import axiosAuth from "libs/axios-auth";
import { getUserToken } from "helpers/user-token";

import { Status, FeedPageState } from "../types";

export const fetchPosts = createAsyncThunk(
  "feedPage/fetchPosts",
  async (params: any, thunkAPI) => {
    try {
      const endpoint = `/posts.json?sort=lastUpdated.DESC&size=5&page=${params.page}`;
      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
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
      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint: "/villages.json?page=1&size=2" },
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
      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint: "/users.json?page=1&size=2" },
      });
      return response.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const submitPost = createAsyncThunk(
  "feedPage/submitPost",
  async (
    params: {
      content?: string;
      picture?: any;
      video?: any;
    },
    thunkAPI
  ) => {
    try {
      const access_token = getUserToken();

      const bodyFormData = new FormData();
      bodyFormData.append("content", params.content);
      bodyFormData.append("picture", params.picture);
      bodyFormData.append("video", params.video);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/me/post`,
        bodyFormData,
        {
          headers: {
            authorization: "Bearer " + access_token,
            "content-type": `multipart/form-data`,
          },
        }
      );

      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue({ error: error.message });
      return thunkAPI.rejectWithValue(error.response.statusText);
    }
  }
);

/************************************* */
const initialState: FeedPageState = {
  status: Status.IDLE,
  postStatus: Status.IDLE,
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
    resetPosts: (state) => {
      state.postStatus =  Status.IDLE;
      state.posts = [];
    },
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
    builder.addCase(submitPost.pending, (state, action) => {
      state.postStatus = Status.LOADING;
      state.error = null;
    });
    builder.addCase(submitPost.fulfilled, (state, action) => {
      state.postStatus = Status.SUCCESS;      
    });
    builder.addCase(submitPost.rejected, (state, action) => {
      state.postStatus = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset, resetPosts } = feedPageSlice.actions;
