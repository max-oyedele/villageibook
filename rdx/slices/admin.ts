import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";
var FormData = require("form-data");

import { Status, AdminState } from "../types";
import { getUserToken } from "helpers/user-token";

export const fetchPosts = createAsyncThunk(
  "admin/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get("/api/admin/posts", {
        params: { access_token },
      });
      return response.data.posts;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchArticles = createAsyncThunk(
  "admin/fetchArticles",
  async (_, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get("/api/admin/articles", {
        params: { access_token },
      });
      return response.data.articles;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchPersonalities = createAsyncThunk(
  "admin/fetchPersonalities",
  async (_, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get("/api/admin/personalities", {
        params: { access_token },
      });
      return response.data.personalities;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchInstitutions = createAsyncThunk(
  "admin/fetchInstitutions",
  async (_, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get("/api/admin/institutions", {
        params: { access_token },
      });
      return response.data.institutions;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVideos = createAsyncThunk(
  "admin/fetchVideos",
  async (_, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get("/api/admin/videos", {
        params: { access_token },
      });
      return response.data.videos;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get("/api/admin/users", {
        params: { access_token },
      });
      return response.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const submitPersonality = createAsyncThunk(
  "admin/submitPersonality",
  async (
    params: {
      name: string;
      about?: string;
      photo?: any;
      video?: any;
      dateOfBirth?: string;
      dateOfDeath?: string;
      educationLife?: string;
      achievements?: string;
      career?: string;
      villageUuid: string;
    },
    thunkAPI
  ) => {
    try {
      const access_token = getUserToken();

      const bodyFormData = new FormData();
      bodyFormData.append("name", params.name);
      bodyFormData.append("about", params.about);
      bodyFormData.append("hasPhotoUrl", params.photo.avatar);
      bodyFormData.append("hasPhotoName", params.photo.name);
      bodyFormData.append("hasPhotoDescription", params.photo.description);
      // bodyFormData.append("hasVideoUrl", params.video.avatar);

      params.dateOfBirth &&
        bodyFormData.append("dateOfBirth", params.dateOfBirth);
      params.dateOfDeath &&
        bodyFormData.append("dateOfDeath", params.dateOfDeath);
      bodyFormData.append("educationLife", params.educationLife);
      bodyFormData.append("achievements", params.achievements);
      bodyFormData.append("career", params.career);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/villages/${params.villageUuid}/HAS_PERSONALITY/personalities`,
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

export const submitInstitution = createAsyncThunk(
  "admin/submitInstitution",
  async (
    params: {
      name: string;
      photo?: any;
      video?: any;
      yearEstablished?: string;
      address?: string;
      email?: string;
      phone?: string;
      history?: string;
      villageUuid: string;
    },
    thunkAPI
  ) => {
    try {
      const access_token = getUserToken();

      const bodyFormData = new FormData();
      bodyFormData.append("name", params.name);
      bodyFormData.append("hasPhotoUrl", params.photo.avatar);
      bodyFormData.append("hasPhotoName", params.photo.name);
      bodyFormData.append("hasPhotoDescription", params.photo.description);
      // bodyFormData.append("hasVideoUrl", params.video.avatar);

      bodyFormData.append("yearEstablished", params.yearEstablished);
      bodyFormData.append("address", params.address);
      bodyFormData.append("email", params.email);
      bodyFormData.append("phone", params.phone);
      bodyFormData.append("history", params.history);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/villages/${params.villageUuid}/HAS_INSTITUTION/institutions`,
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

/************************************* */
const initialState: AdminState = {
  status: Status.IDLE,
  posts: [],
  articles: [],
  personalities: [],
  institutions: [],
  videos: [],
  users: [],
  error: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchArticles.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.articles = action.payload;
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchPersonalities.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchPersonalities.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.personalities = action.payload;
    });
    builder.addCase(fetchPersonalities.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchInstitutions.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchInstitutions.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.institutions = action.payload;
    });
    builder.addCase(fetchInstitutions.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchVideos.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.videos = action.payload;
    });
    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(submitPersonality.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(submitPersonality.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      // state.me = action.payload;
    });
    builder.addCase(submitPersonality.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(submitInstitution.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(submitInstitution.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      // state.me = action.payload;
    });
    builder.addCase(submitInstitution.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = adminSlice.actions;
