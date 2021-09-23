import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

import axios from "axios";

import { Status, BrowsePageState } from "../types";

//mock data
import {
  posts,
  recentVillages,
  recentUsers,
  totalGraduates,
  village,
  villageGraduates,
  countryGraduates,
  bangladeshGraduates,
} from "data/browse";

export const fetchBrowsePageData = createAsyncThunk(
  "browsePage/fetchData",
  async (params: any, thunkAPI) => {
    try {
      // const response = await axios.get('api/village-page-data', {params: params})
      // return response.data.villagePageData; // data: {villagePageData: []}

      return {
        posts,
        recentVillages,
        recentUsers,
        totalGraduates,
        village,
        villageGraduates,
        countryGraduates,
        bangladeshGraduates,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/************************************* */
const initialState: BrowsePageState = {
  status: Status.IDLE,
  pageData: {
    posts: [],
    recentVillages: [],
    recentUsers: [],
    totalGraduates: 0,
    village: {
      id: 0,
      name: "",
      href: "",
      uuid: "000",
      img: "",
      recentAt: 0,
    },
    villageGraduates: 0,
    countryGraduates: {},
    bangladeshGraduates: {},
  },
  error: null,
};

export const browsePageSlice = createSlice({
  name: "browsePage",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    setVillage: (state, action) => {console.log(action.payload); state.pageData.village = action.payload},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBrowsePageData.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchBrowsePageData.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.pageData = action.payload;
    });
    builder.addCase(fetchBrowsePageData.rejected, (state, action) => {
      // state.error = (
      //   action.payload as { error: string; error_description: string }
      // ).error_description;
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset, setVillage } = browsePageSlice.actions;
