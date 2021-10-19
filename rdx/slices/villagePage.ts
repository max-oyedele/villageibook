import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, VillagePageState } from "../types";

//mock data
import {
  users,
  articles,
  personalities,
  institutions,
  videos,
} from "data/village";

import { getUserToken } from "helpers/get-user-token";

export const fetchVillageUsers = createAsyncThunk(
  "villagePage/fetchVillageUsers",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get('/api/village/users', {...params, access_token})
      return response.data.users; // data: {users: []}

      return {
        users: users.filter((item) => item.comesFrom === params.villageName),
        graduates: users.filter(
          (item) => item.comesFrom === params.villageName && item.graduatedAt
        ),
        articles: articles.filter(
          (item) => item.village === params.villageName
        ),
        personalities: personalities.filter(
          (item) => item.comesFrom === params.villageName
        ),
        institutions: institutions.filter(
          (item) => item.village === params.villageName
        ),
        videos: videos.filter((item) => item.village === params.villageName),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVillageGraduates = createAsyncThunk(
  "villagePage/fetchVillageGraduates",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get('/api/village/graduates', {...params, access_token})
      return response.data.graduates; // data: {graduates: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVillageArticles = createAsyncThunk(
  "villagePage/fetchVillageArticles",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get('/api/village/articles', {...params, access_token})
      return response.data.articles; // data: {articles: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVillagePersonalities = createAsyncThunk(
  "villagePage/fetchVillagePersonalities",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get('/api/village/personalities', {...params, access_token})
      return response.data.personalities; // data: {personalities: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVillageInstitutions = createAsyncThunk(
  "villagePage/fetchVillageInstitutions",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get('/api/village/institutions', {...params, access_token})
      return response.data.institutions; // data: {institutions: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVillageVideos = createAsyncThunk(
  "villagePage/fetchVillageVideos",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const response = await axios.get('/api/village/videos', {...params, access_token})
      return response.data.videos; // data: {videos: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/************************************* */
const initialState: VillagePageState = {
  status: Status.IDLE,
  villageUsers: [],
  villageGraduates: [],
  villageArticles: [],
  villagePersonalities: [],
  villageInstitutions: [],
  villageVideos: [],
  error: null,
};

export const villagePageSlice = createSlice({
  name: "villagePage",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVillageUsers.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchVillageUsers.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.villageUsers = action.payload;
    });
    builder.addCase(fetchVillageUsers.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchVillageGraduates.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchVillageGraduates.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.villageGraduates = action.payload;
    });
    builder.addCase(fetchVillageGraduates.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchVillageArticles.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchVillageArticles.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.villageArticles = action.payload;
    });
    builder.addCase(fetchVillageArticles.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchVillagePersonalities.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchVillagePersonalities.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.villagePersonalities = action.payload;
    });
    builder.addCase(fetchVillagePersonalities.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchVillageInstitutions.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchVillageInstitutions.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.villageInstitutions = action.payload;
    });
    builder.addCase(fetchVillageInstitutions.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchVillageVideos.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchVillageVideos.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.villageVideos = action.payload;
    });
    builder.addCase(fetchVillageVideos.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = villagePageSlice.actions;
