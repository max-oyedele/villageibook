import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axiosAuth from "libs/axios-auth";

var FormData = require("form-data");

import { Status, ViewState } from "../types";

export const fetchUser = createAsyncThunk(
  "view/fetchUser",
  async (params: any, thunkAPI) => {
    try {
      const endpoint = `/users/${params.uuid}.json`;
      const response = await axiosAuth.get(`/api/entry`, {
        params: { endpoint },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchPersonality = createAsyncThunk(
  "view/fetchPersonality",
  async (params: any, thunkAPI) => {
    try {
      const endpoint = `/personalities/${params.uuid}.json?fields=name,about,photo.url,photo.name,photo.description,dateOfBirth,dateOfDeath,educationLife,achievements,career,uuid`;
      const response = await axiosAuth.get(`/api/entry`, {
        params: { endpoint },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchInstitution = createAsyncThunk(
  "view/fetchInstitution",
  async (params: any, thunkAPI) => {
    try {
      const endpoint = `/institutions/${params.uuid}.json?fields=name,photo.url,photo.name,photo.description,yearEstablished,address,email,phone,history,uuid`
      const response = await axiosAuth.get(`/api/entry`, {
        params: { endpoint },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/********************************** */
const initialState: ViewState = {
  status: Status.IDLE,
  user: null,
  userError: null,
  story: null,
  storyError: null,
  personality: null,
  personalityError: null,
  institution: null,
  institutionError: null,
};

export const viewSlice = createSlice({
  name: "view",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
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
    builder.addCase(fetchPersonality.pending, (state, action) => {
      state.status = Status.LOADING;
      state.personalityError = null;
    });
    builder.addCase(fetchPersonality.fulfilled, (state, action) => {
      state.personality = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(fetchPersonality.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.personalityError = action.payload;
    });
    builder.addCase(fetchInstitution.pending, (state, action) => {
      state.status = Status.LOADING;
      state.institutionError = null;
    });
    builder.addCase(fetchInstitution.fulfilled, (state, action) => {
      state.institution = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(fetchInstitution.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.institutionError = action.payload;
    });
  },
});

export const { reset } = viewSlice.actions;
