import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export enum FrogStates {
  IDLE = 'idle',
  LOADING = 'loading',
}


const internalInitialState = {
  loading: FrogStates.IDLE,
  frogs: [],
  error: null,
}

export const frogsSlice = createSlice({
  name: 'frogs',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {},
})

export const { reset } = frogsSlice.actions

export const fetchFrogs = createAsyncThunk('auth/frogs', async (_, thunkAPI) => {
  try {
    const response = await axios.get<{ hits: any[] }>('api/frogs') // Call proxy server (api/pages/frogs.ts)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})