import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

var FormData = require("form-data");

import { Status, PostState } from "../types";

import { getUserToken } from "helpers/user-token";

export const submitPost = createAsyncThunk(
  "post/submitPost",
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

/********************************** */
const initialState: PostState = {
  status: Status.IDLE,
  error: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {    
    builder.addCase(submitPost.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(submitPost.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;      
    });
    builder.addCase(submitPost.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = postSlice.actions;
