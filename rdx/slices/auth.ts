import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "libs/axios";

export enum AuthStates {
  IDLE = "idle",
  LOADING = "loading",
}

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
      const response = await axios.post<{ access_token: string }>(
        "api/auth/login",
        credentials
      );
      // // const refetch = await axios.get<{ name: string }>('api/me', {
      // //   headers: { Authorization: `Bearer ${response.data.accessToken}` },
      // // })
      // return { accessToken: response.data.accessToken, me: { name: refetch.data.name } }

      return response.data;
    } catch (error) {
      // console.log('werwerwe', error.response)
      // return thunkAPI.rejectWithValue({ error: error.message })

      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    credentials: { firstname: string; lastname: string; email: string; password: string; token: string },
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
export interface AuthSliceState {
  accessToken: string;
  loading: AuthStates;
  user?: any;
  error?: SerializedError;
}

const internalInitialState = {
  accessToken: "",
  loading: AuthStates.IDLE,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(
      state: AuthSliceState,
      action: PayloadAction<{ token: string }>
    ) {
      state.accessToken = action.payload.token;
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = AuthStates.LOADING;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.access_token;
      // state.me = action.payload.me
      state.loading = AuthStates.IDLE;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      // state = { ...internalInitialState, error: action.error.message }
      state.error = (
        action.payload as { error: string; error_description: string }
      ).error_description;
      state.loading = AuthStates.IDLE;
      state.accessToken = "";
      // throw new Error(action.error.message)
    });
    builder.addCase(signup.pending, (state, action) => {
      state.loading = AuthStates.LOADING;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = AuthStates.IDLE;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.error = (
        action.payload as { error: string, message: string}
      ).message;
      state.loading = AuthStates.IDLE;
      state.accessToken = "";
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(logout.fulfilled, (_state) => internalInitialState);
    
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
