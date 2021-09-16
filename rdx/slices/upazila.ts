import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios"

import {Status, UpazilaState} from "../types"

export const fetchUpazilas = createAsyncThunk('upazila/upazilas', async (params:any, thunkAPI) => {
  try {
    const response = await axios.get('api/upazilas', {params})
    return response.data['sub-districts']; // data: {pagination: {}, sub-districts: []}
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

/************************************* */
const initialState:UpazilaState = {
  status: Status.IDLE,
  upazilas: [],
  error: null,
}

export const upazilaSlice = createSlice({
  name: 'upazila',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUpazilas.pending, (state) => {
      state.status = Status.LOADING;
      state.upazilas = [];
      state.error = null;
    });
    builder.addCase(fetchUpazilas.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.upazilas = action.payload;
    });
    builder.addCase(fetchUpazilas.rejected, (state, action) => {
      // state.error = (
      //   action.payload as { error: string; error_description: string }
      // ).error_description;
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
})

export const { reset } = upazilaSlice.actions