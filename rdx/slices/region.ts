import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios"

import {Status, RegionState} from "../types"

export const fetchRegions = createAsyncThunk('region/regions', async (_, thunkAPI) => {
  try {
    const response = await axios.get<{ regions: any[] }>('api/regions')
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

/************************************* */
const initialState = {
  status: Status.IDLE,
  regions: null,
  error: null,
}

export const regionSlice = createSlice({
  name: 'region',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
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
      state.error = (
        action.payload as { error: string; error_description: string }
      ).error_description;
    });
  },
})

export const { reset } = regionSlice.actions