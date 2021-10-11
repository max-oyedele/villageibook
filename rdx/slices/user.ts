import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";
var FormData = require("form-data");

import { Status, Register, UserState } from "../types";

import { fetchUserToken } from "helpers/fetch-user-token";

//mock data
import { users } from "data/village";

export const submitStepOne = createAsyncThunk(
  "user/submitStepOne",
  async (
    params: {
      uuid: string;
      firstName?: string;
      lastName?: string;
      email: string;
      password: string;
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
      const bodyFormData = new FormData();
      bodyFormData.append("firstName", params.firstName);
      bodyFormData.append("lastName", params.lastName);
      bodyFormData.append("avatar", params.avatar);
      bodyFormData.append("livesIn", params.livesIn);
      bodyFormData.append("comesFrom", params.comesFrom);
      bodyFormData.append("graduatedAt", params.graduatedAt);
      bodyFormData.append("university", params.university);
      bodyFormData.append("degree", params.degree);
      bodyFormData.append("profession", params.profession);

      const { access_token } = await fetchUserToken({
        username: params.email,
        password: params.password,
      });

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${params.uuid}`,
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
      uuid: string;
      email: string;
      password: string;
      avatar?: any;
      aboutMe?: string;
      media?: any;
    },
    thunkAPI
  ) => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("avatar", params.avatar);
      bodyFormData.append("aboutMe", params.aboutMe);
      bodyFormData.append("media", params.media);

      const { access_token } = await fetchUserToken({
        username: params.email,
        password: params.password,
      });

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${params.uuid}`,
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

export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async (params: any, thunkAPI) => {
    try {
      const response = await axios.get(`/api/users/${params.uuid}`, { params });
      return response.data;
      // return users.find(e=>e.id == params.uuid)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (params: any, thunkAPI) => {
    try {
      // const response = await axios.get(`/api/users/${params.uuid}`);
      // return response.data;
      return users.find((e) => e.id == params.uuid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/********************************** */
const initialState: UserState = {
  status: Status.IDLE,
  step: Register.STEP1,
  user: null,
  // user: {
  //   id: 584,
  //   firstName: "James",
  //   lastName: "Smith",
  //   img: "/images/avatar.png",
  //   email: "test6@gmail.com",
  //   password: "123",
  //   uuid: "879a1f43-d496-43eb-a658-648071820d31",
  //   role: "premium",
  //   village: "jammura",
  //   graduatedAt: "uk",
  //   university: "Oxford",
  //   profession: "computer science",
  //   degree: "bachelor",
  // },
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(submitStepOne.pending, (state, action) => {
      state.step = Register.STEP1;
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(submitStepOne.fulfilled, (state, action) => {
      state.step = Register.STEP2;
      state.user = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(submitStepOne.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(submitStepTwo.pending, (state, action) => {
      state.step = Register.STEP2;
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(submitStepTwo.fulfilled, (state, action) => {
      state.step = Register.COMPLETED;
      state.user = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(submitStepTwo.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchMe.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = Status.IDLE;
    });
    builder.addCase(fetchMe.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
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
