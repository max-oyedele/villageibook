import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axiosAuth from "libs/axios-auth";

import { Status, VillagePageState } from "../types";

export const fetchVillage = createAsyncThunk(
  "villagePage/fetchVillage",
  async (params: any, thunkAPI) => {
    try {
      const endpoint = `/villages/${params?.villageUuid}.json`;
      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVillageUsers = createAsyncThunk(
  "villagePage/fetchVillageUsers",
  async (params: any, thunkAPI) => {
    try {
      const endpoint = `/villages/${params?.villageUuid}/users.json`;
      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data; // data: {users: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVillageStories = createAsyncThunk(
  "villagePage/fetchVillageStories",
  async (params: any, thunkAPI) => {
    try {
      const endpoint = `/villages/${params?.villageUuid}/stories.json`;
      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data; // data: {stories: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVillagePersonalities = createAsyncThunk(
  "villagePage/fetchVillagePersonalities",
  async (params: any, thunkAPI) => {
    try {
      const endpoint = `/villages/${params?.villageUuid}/personalities.json?fields=name,about,photo.url,photo.name,photo.description,dateOfBirth,dateOfDeath,educationLife,achievements,career,uuid`;
      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data; // data: {personalities: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVillageInstitutions = createAsyncThunk(
  "villagePage/fetchVillageInstitutions",
  async (params: any, thunkAPI) => {
    try {
      const endpoint = `/villages/${params?.villageUuid}/institutions.json?fields=name,photo.url,photo.name,photo.description,yearEstablished,address,email,phone,history,uuid`;
      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data; // data: {institutions: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVillageVideos = createAsyncThunk(
  "villagePage/fetchVillageVideos",
  async (params: any, thunkAPI) => {
    try {
      const endpoint = `/villages/${params?.villageUuid}/videos.json`;
      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data; // data: {videos: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVillagePhotos = createAsyncThunk(
  "villagePage/fetchVillagePhotos",
  async (params: any, thunkAPI) => {
    try {
      // const endpoint = `/villages/${params?.villageUuid}/photos.json`;
      let endpoint = "";
      // if (params?.villageUuid)
      //   endpoint += `/villages/${params.villageUuid}/HAS_MEDIA`;
      endpoint += `/photos.json`;
      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data; // data: {photos: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/************************************* */
const initialState: VillagePageState = {
  status: Status.IDLE,
  village: null,
  villageUsers: null,
  villageStories: null,
  villagePersonalities: null,
  villageInstitutions: null,
  villageVideos: null,
  villagePhotos: null,
  error: null,
};

export const villagePageSlice = createSlice({
  name: "villagePage",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVillage.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchVillage.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.village = action.payload;
    });
    builder.addCase(fetchVillage.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
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
    builder.addCase(fetchVillageStories.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchVillageStories.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.villageStories = action.payload;
    });
    builder.addCase(fetchVillageStories.rejected, (state, action) => {
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
    builder.addCase(fetchVillagePhotos.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchVillagePhotos.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.villagePhotos = action.payload;
    });
    builder.addCase(fetchVillagePhotos.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = villagePageSlice.actions;
