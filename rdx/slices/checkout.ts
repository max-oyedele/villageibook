import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, CheckoutSessionState } from "../types";

export const checkoutSession = createAsyncThunk(
  "checkout/checkoutSession",
  async (params: any, thunkAPI) => {
    try {
      const response = await axios.post("/api/checkout_sessions", params);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/********************************** */
const initialState: CheckoutSessionState = {
  status: Status.IDLE,
  session: null,
  error: null,
};

export const checkoutSessionSlice = createSlice({
  name: "checkout",
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(checkoutSession.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(checkoutSession.fulfilled, (state, action) => {
      state.session = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(checkoutSession.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = checkoutSessionSlice.actions;
