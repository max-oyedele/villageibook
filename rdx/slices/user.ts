import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, UserState } from "../types";

//mock data
import { users } from "data/village";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (params: any, thunkAPI) => {
    try {
      // const response = await axios.get(`/api/users/${params.uuid}`);
      // return response.data;
      return users.find(e=>e.id == params.uuid)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


/************************************* */
const initialState: UserState = {
  status: Status.IDLE,
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = userSlice.actions;
