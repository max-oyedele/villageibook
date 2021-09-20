import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";
import querystring from "querystring";

import {Status, AuthState} from "../types";

// export const fetchUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
//   try {
//     const response = await axios.get<{ name?: string; email?: string; type?: string }>('api/me')

//     return response.data
//   } catch (error) {
//     return thunkAPI.rejectWithValue({ error: error.message })
//   }
// })

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post<{ jwt: any }>(
        "api/auth/login",
        credentials
      );
      // // const refetch = await axios.get<{ name: string }>('api/me', {
      // //   headers: { Authorization: `Bearer ${response.data.accessToken}` },
      // // })
      // return { accessToken: response.data.accessToken, me: { name: refetch.data.name } }
      console.log('login res data', response.data)
      return response.data;
    } catch (error) {
      console.log('login err data', error.response.data)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    credentials: { firstname: string; lastname: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post<{ user: any }>(
        "api/auth/signup",
        credentials
      );
      // const refetch = await axios.get<{ name: string }>("api/me", {
      //   headers: { Authorization: `Bearer ${response.data.accessToken}` },
      // });
      // return {
      //   accessToken: response.data.accessToken,
      //   me: { name: refetch.data.name },
      // };
      
      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue({ error: error.message });
      
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.delete<{ accessToken: string }>("api/logout");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

/********************************** */
const initialState = {
  jwt: null,
  status: Status.IDLE,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    updateAccessToken(
      state: AuthState,
      action: PayloadAction<{ token: string }>
    ) {
      state.jwt = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.jwt = action.payload;
      // state.me = action.payload.me
      state.status = Status.IDLE;
    });
    builder.addCase(login.rejected, (state, action) => {
      // state = { ...internalInitialState, error: action.error.message }
      state.error = (
        action.payload as { error: string; error_description: string }
      ).error_description;
      state.status = Status.IDLE;
      state.jwt = null;
      // throw new Error(action.error.message)
    });
    builder.addCase(signup.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.error = (
        action.payload as { status: number, error: string, message: string}
      ).message;
      state.status = Status.IDLE;
    });
    builder.addCase(logout.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(logout.fulfilled, (_state) => initialState);
    
    // builder.addCase(fetchUser.rejected, (state, action) => {
    //   state = { ...internalInitialState, error: action.error }
    //   // throw new Error(action.error.message)
    // })
    // builder.addCase(fetchUser.fulfilled, (state, action) => {
    //   state.me = action.payload
    // })
  },
});

export const { updateAccessToken, reset } = authSlice.actions;