import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, CommonState } from "../types";
import { getUserToken } from "helpers/user-token";

/*********************** */
export const fetchCountries = createAsyncThunk(
  "common/countries",
  async (_, thunkAPI) => {
    try {
      const immutableCountries = localStorage.getItem("immutableCountries");
      if (immutableCountries) {
        return JSON.parse(immutableCountries);
      }

      const access_token = getUserToken();
      const response = await axios.get("/api/entry", {
        params: { endpoint: "/countries.json?page=1&size=210", access_token },
      });

      localStorage.setItem(
        "immutableCountries",
        JSON.stringify(response.data.countries)
      );

      return response.data.countries; // data: {pagination: {}, countries: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchRegions = createAsyncThunk(
  "common/regions",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const endpoint = "/regions.json";
      const response = await axios.get("/api/entry", {
        params: { endpoint, access_token },
      });
      return response.data.regions;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchDistricts = createAsyncThunk(
  "common/districts",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const endpoint = params?.region
        ? `/region/[href=${params.region.href}]/districts.json`
        : "/districts.json";

      const response = await axios.get("/api/entry", {
        params: { endpoint, access_token },
      });
      return response.data.districts; // data: {pagination: {}, districts: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchSubDistricts = createAsyncThunk(
  "common/subDistricts",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const endpoint = params?.district
        ? `/district/[href=${params.district.href}]/sub-districts.json`
        : "/sub-districts.json";

      const response = await axios.get("/api/entry", {
        params: { endpoint, access_token },
      });
      return response.data["sub-districts"]; // data: {pagination: {}, sub-districts: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVillages = createAsyncThunk(
  "common/villages",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      const endpoint = params?.subDistrict
        ? `/sub-district/[href=${params.subDistrict.href}]/villages.json`
        : "/villages.json?fields=name,heading,description,history,photo.url,href,uuid,lastUpdated";

      const response = await axios.get("/api/entry", {
        params: { endpoint, access_token },
      });
      return response.data.villages; // data: {pagination: {}, villages: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchUniversities = createAsyncThunk(
  "common/universities",
  async (_, thunkAPI) => {
    try {
      const immutableUniversities = localStorage.getItem(
        "immutableUniversities"
      );
      if (immutableUniversities) {
        return JSON.parse(immutableUniversities);
      }

      const access_token = getUserToken();
      const response = await axios.get("/api/entry", {
        params: {
          endpoint: "/universities.json", //?page=1&size=9220
          access_token,
        },
      });

      localStorage.setItem(
        "immutableUniversities",
        JSON.stringify(response.data.universities)
      );

      return response.data.universities; // data: {pagination: {}, universities: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchProfessions = createAsyncThunk(
  "common/professions",
  async (_, thunkAPI) => {
    try {
      const immutableProfessions = localStorage.getItem("immutableProfessions");
      if (immutableProfessions) {
        return JSON.parse(immutableProfessions);
      }

      const access_token = getUserToken();
      const response = await axios.get("/api/entry", {
        params: {
          endpoint: "/professions.json?page=1&size=1200",
          access_token,
        },
      });

      localStorage.setItem(
        "immutableProfessions",
        JSON.stringify(response.data.professions)
      );

      return response.data.professions; // data: {pagination: {}, professions: []}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchDegrees = createAsyncThunk(
  "common/degrees",
  async (_, thunkAPI) => {
    try {
      const immutableDegrees = localStorage.getItem("immutableDegrees");
      if (immutableDegrees) {
        return JSON.parse(immutableDegrees);
      }

      const access_token = getUserToken();
      const response = await axios.get("/api/entry", {
        params: {
          endpoint:
            "/admin/schema/relationships/GRADUATED_AT.json?page=1&size=20",
          access_token,
        },
      });

      localStorage.setItem(
        "immutableDegrees",
        JSON.stringify(response.data.properties[0]?.possibleValues)
      );
      
      return response.data.properties[0]?.possibleValues;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/************************************* */
const initialState: CommonState = {
  status: Status.IDLE,
  countries: [],
  regions: [],
  districts: [],
  subDistricts: [],
  villages: [],
  universities: [],
  professions: [],
  degrees: [],
  error: null,
};

export const commonSlice = createSlice({
  name: "common",
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
    builder.addCase(fetchDegrees.pending, (state) => {
      state.status = Status.LOADING;
      state.degrees = [];
      state.error = null;
    });
    builder.addCase(fetchDegrees.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.degrees = action.payload;
    });
    builder.addCase(fetchDegrees.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = commonSlice.actions;
