import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios"

import {Status, VillageState} from "../types"

export const fetchVillages = createAsyncThunk('village/villages', async (params:any, thunkAPI) => {
  try {
    const response = await axios.get('api/villages', {params: params})
    return response.data.villages; // data: {pagination: {}, villages: []}
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

/************************************* */
const initialState:VillageState = {
  status: Status.IDLE,
  villages: [],
  error: null,
}

export const villageSlice = createSlice({
  name: 'village',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
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

export const { reset } = villageSlice.actions