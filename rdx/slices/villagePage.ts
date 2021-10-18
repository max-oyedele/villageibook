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

import { getUserToken } from "helpers/get-user-token";


export const fetchVillagePage = createAsyncThunk(
  "villagePage/fetch",
  async (params: any, thunkAPI) => {
    try {
      const access_token = getUserToken();
      // const response = await axios.get('/api/village-page-data', {...params, access_token})
      // return response.data.villagePageData; // data: {villagePageData: []}

      return {
        users: users.filter((item) => item.comesFrom === params.villageName),
        graduates: users.filter((item)=>item.comesFrom === params.villageName && item.graduatedAt),
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
    builder.addCase(fetchVillagePage.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchVillagePage.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.pageData = action.payload;
    });
    builder.addCase(fetchVillagePage.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset } = villagePageSlice.actions;
