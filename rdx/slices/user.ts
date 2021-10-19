import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

var FormData = require("form-data");

import { Status, Step, UserState } from "../types";

import { getUserToken } from "helpers/get-user-token";


export const fetchMe = createAsyncThunk("user/fetchMe", async (_, thunkAPI) => {
  try {
    const access_token = getUserToken();
    const response = await axios.get(`/api/users/me`, {
      params: { access_token },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get(`/api/users/${params.uuid}`, { ...params, access_token });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const submitStepOne = createAsyncThunk(
  "user/submitStepOne",
  async (
    params: {
      firstName?: string;
      lastName?: string;
      avatar?: any;
      livesIn?: string;
      comesFrom?: string;
      graduatedAt?: string;
      university?: string;
      degree?: string;
      profession?: string;
    },
    thunkAPI
  ) => {
    try {
      const access_token = getUserToken();

      const bodyFormData = new FormData();
      bodyFormData.append("firstName", params.firstName);
      bodyFormData.append("lastName", params.lastName);
      bodyFormData.append("avatar", params.avatar);
      bodyFormData.append("livesIn", params.livesIn);
      bodyFormData.append("comesFrom", params.comesFrom);
      bodyFormData.append("graduatedAt", params.graduatedAt);
      bodyFormData.append("degree", params.degree);
      bodyFormData.append("profession", params.profession);

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/me`,
        bodyFormData,
        {
          headers: {
            authorization: "Bearer " + access_token,
            "content-type": `multipart/form-data`,
          },
        }
      );

      console.log("responsedata", response.data);
      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue({ error: error.message });
      return thunkAPI.rejectWithValue(error.response.statusText);
    }
  }
);

export const submitStepTwo = createAsyncThunk(
  "user/submitStepTwo",
  async (
    params: {
      avatar?: any;
      about: string;
      photo1?: string;
      photo2?: string;
      photo3?: string;
      media?: any;
    },
    thunkAPI
  ) => {
    try {
      const access_token = getUserToken();

      const bodyFormData = new FormData();
      bodyFormData.append("avatar", params.avatar);
      bodyFormData.append("about", params.about);
      bodyFormData.append("photo1", params.photo1);
      bodyFormData.append("photo2", params.photo3);
      bodyFormData.append("photo3", params.photo3);

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/me`,
        bodyFormData,
        {
          headers: {
            authorization: "Bearer " + access_token,
            "content-type": `multipart/form-data`,
          },
        }
      );

      console.log("responsedata", response.data);
      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue({ error: error.message });
      return thunkAPI.rejectWithValue(error.response.statusText);
    }
  }
);

export const submitPost = createAsyncThunk(
  "user/submitPost",
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

      console.log("responsedata", response.data);
      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue({ error: error.message });
      return thunkAPI.rejectWithValue(error.response.statusText);
    }
  }
);

/********************************** */
const initialState: UserState = {
  status: Status.IDLE,
  me: null,
  meStep: Step.STEP1,
  meError: null,
  postError: null,
  user: null,
  userError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMe.pending, (state, action) => {
      state.status = Status.LOADING;
      state.meError = null;
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.me = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(fetchMe.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.meError = action.payload;
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      state.status = Status.LOADING;
      state.userError = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.userError = action.payload;
    });
    builder.addCase(submitStepOne.pending, (state, action) => {
      state.meStep = Step.STEP1;
      state.status = Status.LOADING;
      state.meError = null;
    });
    builder.addCase(submitStepOne.fulfilled, (state, action) => {
      state.me = action.payload;
      state.meStep = Step.STEP2;
      state.status = Status.IDLE;
    });
    builder.addCase(submitStepOne.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.meError = action.payload;
    });
    builder.addCase(submitStepTwo.pending, (state, action) => {
      state.status = Status.LOADING;
      state.meStep = Step.STEP2;
      state.meError = null;
    });
    builder.addCase(submitStepTwo.fulfilled, (state, action) => {
      state.me = action.payload;
      state.meStep = Step.COMPLETED;
      state.status = Status.IDLE;
    });
    builder.addCase(submitStepTwo.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.meError = action.payload;
    });
    builder.addCase(submitPost.pending, (state, action) => {
      state.status = Status.LOADING;
      state.postError = null;
    });
    builder.addCase(submitPost.fulfilled, (state, action) => {
      state.status = Status.IDLE;
    });
    builder.addCase(submitPost.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.postError = action.payload;
    });
  },
});

export const { reset } = userSlice.actions;
