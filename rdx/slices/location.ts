import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios"

import {Status, LocationState} from "../types"

/*********************** */
export const fetchCountries = createAsyncThunk('location/countries', async (_, thunkAPI) => {
  try {
    // const response = await axios.get('/api/countries')
    // return response.data.countries; // data: {pagination: {}, countries: []}
    return [
      {
        id: 0,
        name: "Bangladesh",
        href: "bangladesh",
        uuid: "000",
      },
      {
        id: 1,
        name: "Australia",
        href: "australia",
        uuid: "001",
      },
      {
        id: 2,
        name: "Canada",
        href: "canada",
        uuid: "002",
      },
      {
        id: 3,
        name: "Europe/EU",
        href: "europe",
        uuid: "003",
      },
      {
        id: 4,
        name: "UK",
        href: "uk",
        uuid: "004",
      },
      {
        id: 5,
        name: "USA",
        href: "usa",
        uuid: "005",
      },
      {
        id: 6,
        name: "Other",
        href: "other",
        uuid: "006",
      },
    ]
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const fetchRegions = createAsyncThunk('location/regions', async (params:any, thunkAPI) => {
  try {
    const response = await axios.get('/api/regions', {params})
    return response.data.regions;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const fetchDistricts = createAsyncThunk('location/districts', async (params:any, thunkAPI) => {
  try {
    const response = await axios.get('/api/districts', {params})
    return response.data.districts; // data: {pagination: {}, districts: []}
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const fetchSubDistricts = createAsyncThunk('location/subDistricts', async (params:any, thunkAPI) => {
  try {
    const response = await axios.get('/api/subDistricts', {params})
    return response.data['sub-districts']; // data: {pagination: {}, sub-districts: []}
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const fetchVillages = createAsyncThunk('location/villages', async (params:any, thunkAPI) => {
  try {
    // const response = await axios.get('/api/villages', {params: params})
    // return response.data.villages; // data: {pagination: {}, villages: []}
    return [
      {
        id: 0,
        name: "Jammura",
        href: "jammura",
        uuid: "000"
      },
      {
        id: 1,
        name: "Village1",
        href: "village1",
        uuid: "001"
      },
      {
        id: 2,
        name: "Village2",
        href: "village2",
        uuid: "002"
      },
    ]
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

/************************************* */
const initialState:LocationState = {
  status: Status.IDLE,
  countries: [],
  regions: [],
  districts: [],
  subDistricts: [],
  villages: [],
  error: null,
}

export const locationSlice = createSlice({
  name: 'location',
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
  },
})

export const { reset } = locationSlice.actions