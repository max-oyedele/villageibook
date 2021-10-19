import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, LocationState } from "../types";

/*********************** */
export const fetchCountries = createAsyncThunk(
  "location/countries",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/location/countries')
      return response.data.countries; // data: {pagination: {}, countries: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchRegions = createAsyncThunk(
  "location/regions",
  async (params: any, thunkAPI) => {
    try {
      const response = await axios.get("/api/location/regions", { params });
      return response.data.regions;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchDistricts = createAsyncThunk(
  "location/districts",
  async (params: any, thunkAPI) => {
    try {
      const response = await axios.get("/api/location/districts", { params });
      return response.data.districts; // data: {pagination: {}, districts: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchSubDistricts = createAsyncThunk(
  "location/subDistricts",
  async (params: any, thunkAPI) => {
    try {
      const response = await axios.get("/api/location/subDistricts", { params });
      return response.data["sub-districts"]; // data: {pagination: {}, sub-districts: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVillages = createAsyncThunk(
  "location/villages",
  async (params: any, thunkAPI) => {
    try {
      const response = await axios.get('/api/location/villages', { params })
      return response.data.villages; // data: {pagination: {}, villages: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchUniversities = createAsyncThunk(
  "location/universities",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/location/universities')
      return response.data.universities; // data: {pagination: {}, universities: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchProfessions = createAsyncThunk(
  "location/professions",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/location/professions')
      return response.data.professions; // data: {pagination: {}, professions: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/************************************* */
const initialState: LocationState = {
  status: Status.IDLE,
  countries: [],
  regions: [],
  districts: [],
  subDistricts: [],
  villages: [],
  universities: [],
  professions: [],
  error: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.pending, (state) => {
      state.status = Status.LOADING;
      state.countries = [];
      state.error = null;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.countries = action.payload;
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });

    builder.addCase(fetchRegions.pending, (state) => {
      state.status = Status.LOADING;
      state.regions = [];
      state.error = null;
    });
    builder.addCase(fetchRegions.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.regions = action.payload;
    });
    builder.addCase(fetchRegions.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });

    builder.addCase(fetchDistricts.pending, (state) => {
      state.status = Status.LOADING;
      state.districts = [];
      state.error = null;
    });
    builder.addCase(fetchDistricts.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.districts = action.payload;
    });
    builder.addCase(fetchDistricts.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });

    builder.addCase(fetchSubDistricts.pending, (state) => {
      state.status = Status.LOADING;
      state.subDistricts = [];
      state.error = null;
    });
    builder.addCase(fetchSubDistricts.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.subDistricts = action.payload;
    });
    builder.addCase(fetchSubDistricts.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });

    builder.addCase(fetchVillages.pending, (state) => {
      state.status = Status.LOADING;
      state.villages = [];
      state.error = null;
    });
    builder.addCase(fetchVillages.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.villages = action.payload;
    });
    builder.addCase(fetchVillages.rejected, (state, action) => {
      // state.error = (
      //   action.payload as { error: string; error_description: string }
      // ).error_description;
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchUniversities.pending, (state) => {
      state.status = Status.LOADING;
      state.universities = [];
      state.error = null;
    });
    builder.addCase(fetchUniversities.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.universities = action.payload;
    });
    builder.addCase(fetchUniversities.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchProfessions.pending, (state) => {
      state.status = Status.LOADING;
      state.professions = [];
      state.error = null;
    });
    builder.addCase(fetchProfessions.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.professions = action.payload;
    });
    builder.addCase(fetchProfessions.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = locationSlice.actions;
