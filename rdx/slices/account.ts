import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

var FormData = require("form-data");

import { Status, Step, AccountState } from "../types";

import { getUserToken } from "helpers/user-token";

export const fetchMe = createAsyncThunk("account/fetchMe", async (_, thunkAPI) => {
  try {
    const access_token = getUserToken();
    const response = await axios.get(`/api/entry`, {
      params: { endpoint: "/users/me.json", access_token },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const submitStepOne = createAsyncThunk(
  "account/submitStepOne",
  async (
    params: {
      firstName?: string;
      lastName?: string;
      avatar?: any;
      livesIn?: string;
      comesFrom?: string;
      graduatedAt?: string;
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
      if(params.graduatedAt) bodyFormData.append("graduatedAt", params.graduatedAt);
      console.log('param degree', params.degree)
      if(params.degree) bodyFormData.append("degree", params.degree);
      if(params.profession) bodyFormData.append("profession", params.profession);

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

      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue({ error: error.message });
      return thunkAPI.rejectWithValue(error.response.statusText);
    }
  }
);

export const submitStepTwo = createAsyncThunk(
  "account/submitStepTwo",
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

      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue({ error: error.message });
      return thunkAPI.rejectWithValue(error.response.statusText);
    }
  }
);

/********************************** */
const initialState: AccountState = {
  status: Status.IDLE,
  me: null,
  step: Step.STEP1,
  error: null,  
};

export const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMe.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.me = action.payload;
    });
    builder.addCase(fetchMe.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });    
    builder.addCase(submitStepOne.pending, (state, action) => {
      state.status = Status.LOADING;
      state.step = Step.STEP1;
      state.error = null;
    });
    builder.addCase(submitStepOne.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.me = action.payload;
      state.step = Step.STEP2;
    });
    builder.addCase(submitStepOne.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(submitStepTwo.pending, (state, action) => {
      state.status = Status.LOADING;
      state.step = Step.STEP2;
      state.error = null;
    });
    builder.addCase(submitStepTwo.fulfilled, (state, action) => {
      state.me = action.payload;
      state.step = Step.COMPLETED;
      state.status = Status.IDLE;
    });
    builder.addCase(submitStepTwo.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });    
  },
});

export const { reset } = accountSlice.actions;
