import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, Step, AuthState } from "../types";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    credentials: {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      roles: string[];
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post("/api/auth/signup", credentials);

      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue({ error: error.message });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.delete<{ accessToken: string }>(
      "/api/auth/logout"
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

/********************************** */
const initialState: AuthState = {
  jwt: null,
  status: Status.IDLE,
  me: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    updateJWT: (state: AuthState, action: PayloadAction<{ jwt: any }>) => {
      state.jwt = action.payload;
    },
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.jwt = null;
      state.error = action.payload;
    });
    builder.addCase(signup.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.me = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(logout.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(logout.fulfilled, (_state) => initialState);
  },
});

export const { updateJWT, reset } = authSlice.actions;
