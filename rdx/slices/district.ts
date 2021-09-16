import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios"

import {Status, DistrictState} from "../types"

export const fetchDistricts = createAsyncThunk('district/districts', async (_, thunkAPI) => {
  try {
    const response = await axios.get('api/districts')
    return response.data.districts; // data: {pagination: {}, districts: []}
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

/************************************* */
const initialState:DistrictState = {
  status: Status.IDLE,
  districts: [],
  error: null,
}

export const districtSlice = createSlice({
  name: 'district',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
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
      // state.error = (
      //   action.payload as { error: string; error_description: string }
      // ).error_description;
      state.status = Status.IDLE;      
      state.error = action.payload;
    });
  },
})

export const { reset } = districtSlice.actions