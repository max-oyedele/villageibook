import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios"

import {Status, SubDistrictState} from "../types"

export const fetchSubDistricts = createAsyncThunk('subDistrict/subDistricts', async (params:any, thunkAPI) => {
  try {
    const response = await axios.get('api/subDistricts', {params})
    return response.data['sub-districts']; // data: {pagination: {}, sub-districts: []}
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

/************************************* */
const initialState:SubDistrictState = {
  status: Status.IDLE,
  subDistricts: [],
  error: null,
}

export const subDistrictSlice = createSlice({
  name: 'subDistrict',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
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
      // state.error = (
      //   action.payload as { error: string; error_description: string }
      // ).error_description;
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
})

export const { reset } = subDistrictSlice.actions