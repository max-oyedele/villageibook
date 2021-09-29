import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, VillagePageState } from "../types";

//mock data
import { users, articles, personalities, institutions, videos } from "data/village";

export const fetchVillagePageData = createAsyncThunk(
  "villagePage/fetchData",
  async (params: any, thunkAPI) => {
    try {
      // const response = await axios.get('/api/village-page-data', {params: params})
      // return response.data.villagePageData; // data: {villagePageData: []}

      return {
        users: users.filter((item) => item.village === params.villageName),
        graduates: users.filter((item)=>item.village === params.villageName && item.university),
        articles: articles.filter((item) => item.village === params.villageName),
        personalities: personalities.filter((item) => item.village === params.villageName),
        institutions: institutions.filter((item) => item.village === params.villageName),
        videos: videos.filter((item) => item.village === params.villageName),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/************************************* */
const initialState: VillagePageState = {
  status: Status.IDLE,
  pageData: {
    users: [],
    graduates: [],
    articles: [],
    personalities: [],
    institutions: [],
    videos: [],
  },
  error: null,
};

export const villagePageSlice = createSlice({
  name: "villagePage",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVillagePageData.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchVillagePageData.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.pageData = action.payload;
    });
    builder.addCase(fetchVillagePageData.rejected, (state, action) => {
      // state.error = (
      //   action.payload as { error: string; error_description: string }
      // ).error_description;
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = villagePageSlice.actions;
