import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";
import axiosAuth from "libs/axios-auth";

var FormData = require("form-data");

import { Status, AdminState } from "../types";
import { getUserToken } from "helpers/user-token";

export const fetchPosts = createAsyncThunk(
  "admin/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const endpoint = "/posts.json";
      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data.posts;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchStories = createAsyncThunk(
  "admin/fetchStories",
  async (params: any, thunkAPI) => {
    try {
      let endpoint = "";
      if (params?.villageUuid)
        endpoint += `/villages/${params.villageUuid}/HAS_STORY`;
      endpoint += `/stories.json?fields=title,content,photo.url,photo.name,photo.description,uuid`;

      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data.stories;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchPersonalities = createAsyncThunk(
  "admin/fetchPersonalities",
  async (params: any, thunkAPI) => {
    try {
      let endpoint = "";
      if (params?.villageUuid)
        endpoint += `/villages/${params.villageUuid}/HAS_PERSONALITY`;
      endpoint += `/personalities.json?fields=name,about,photo.url,photo.name,photo.description,dateOfBirth,dateOfDeath,educationLife,achievements,career,uuid`;

      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data.personalities;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchInstitutions = createAsyncThunk(
  "admin/fetchInstitutions",
  async (params: any, thunkAPI) => {
    try {
      let endpoint = "";
      if (params?.villageUuid)
        endpoint += `/villages/${params.villageUuid}/HAS_INSTITUTION`;
      endpoint += `/institutions.json?fields=name,photo.url,photo.name,photo.description,yearEstablished,address,email,phone,history,uuid`;

      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data.institutions;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchVideos = createAsyncThunk(
  "admin/fetchVideos",
  async (params: any, thunkAPI) => {
    try {
      let endpoint = "";
      if (params?.villageUuid)
        endpoint += `/villages/${params.villageUuid}/HAS_MEDIA`;
      endpoint += `/videos.json`;

      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data.videos;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchPhotos = createAsyncThunk(
  "admin/fetchPhotos",
  async (params: any, thunkAPI) => {
    try {
      let endpoint = "";
      if (params?.villageUuid)
        endpoint += `/villages/${params.villageUuid}/HAS_MEDIA`;
      endpoint += `/photos.json`;

      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data.photos;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const endpoint = `/users.json`;
      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchPmusers = createAsyncThunk(
  "admin/fetchPmusers",
  async (_, thunkAPI) => {
    try {
      const endpoint = `/premium-users.json`;
      const response = await axiosAuth.get("/api/entry", {
        params: { endpoint },
      });
      return response.data['premium-users'];
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const submitStory = createAsyncThunk(
  "admin/submitStory",
  async (
    params: {
      title: string;
      content: string;
      photo?: any;
      video?: any;
      villageUuid: string;
      uuid: string;
    },
    thunkAPI
  ) => {
    try {
      const access_token = getUserToken();

      const bodyFormData = new FormData();
      bodyFormData.append("title", params.title);
      bodyFormData.append("content", params.content);
      // bodyFormData.append("hasVideoUrl", params.video?.avatar);

      if (!params.uuid) {
        bodyFormData.append("hasPhotoUrl", params.photo?.avatar);
        bodyFormData.append("hasPhotoName", params.photo?.name);
        bodyFormData.append("hasPhotoDescription", params.photo?.description);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/villages/${params.villageUuid}/HAS_STORY/stories`,
          bodyFormData,
          {
            headers: {
              authorization: "Bearer " + access_token,
              "content-type": `multipart/form-data`,
            },
          }
        );
        return response.data;
      }
      else {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/stories/${params.uuid}`,
          bodyFormData,
          {
            headers: {
              authorization: "Bearer " + access_token,
              "content-type": `multipart/form-data`,
            },
          }
        );
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.statusText);
    }
  }
);

export const submitPersonality = createAsyncThunk(
  "admin/submitPersonality",
  async (
    params: {
      name: string;
      about?: string;
      photo?: any;
      video?: any;
      dateOfBirth?: string;
      dateOfDeath?: string;
      educationLife?: string;
      achievements?: string;
      career?: string;
      villageUuid: string;
      uuid: string;
    },
    thunkAPI
  ) => {
    try {
      const access_token = getUserToken();

      const bodyFormData = new FormData();
      bodyFormData.append("name", params.name);
      bodyFormData.append("about", params.about);
      // bodyFormData.append("hasVideoUrl", params.video.avatar);

      params.dateOfBirth &&
        bodyFormData.append("dateOfBirth", params.dateOfBirth);
      params.dateOfDeath &&
        bodyFormData.append("dateOfDeath", params.dateOfDeath);
      bodyFormData.append("educationLife", params.educationLife);
      bodyFormData.append("achievements", params.achievements);
      bodyFormData.append("career", params.career);

      if (!params.uuid) {
        bodyFormData.append("hasPhotoUrl", params.photo?.avatar);
        bodyFormData.append("hasPhotoName", params.photo?.name);
        bodyFormData.append("hasPhotoDescription", params.photo?.description);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/villages/${params.villageUuid}/HAS_PERSONALITY/personalities`,
          bodyFormData,
          {
            headers: {
              authorization: "Bearer " + access_token,
              "content-type": `multipart/form-data`,
            },
          }
        );
        return response.data;
      } else {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/personalities/${params.uuid}`,
          bodyFormData,
          {
            headers: {
              authorization: "Bearer " + access_token,
              "content-type": `multipart/form-data`,
            },
          }
        );
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.statusText);
    }
  }
);

export const submitInstitution = createAsyncThunk(
  "admin/submitInstitution",
  async (
    params: {
      name: string;
      photo?: any;
      video?: any;
      yearEstablished?: string;
      address?: string;
      email?: string;
      phone?: string;
      history?: string;
      villageUuid: string;
      uuid: string;
    },
    thunkAPI
  ) => {
    try {
      const access_token = getUserToken();

      const bodyFormData = new FormData();
      bodyFormData.append("name", params.name);
      // bodyFormData.append("hasVideoUrl", params.video.avatar);

      bodyFormData.append("yearEstablished", params.yearEstablished);
      bodyFormData.append("address", params.address);
      bodyFormData.append("email", params.email);
      bodyFormData.append("phone", params.phone);
      bodyFormData.append("history", params.history);

      if (!params.uuid) {
        bodyFormData.append("hasPhotoUrl", params.photo?.avatar);
        bodyFormData.append("hasPhotoName", params.photo?.name);
        bodyFormData.append("hasPhotoDescription", params.photo?.description);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/villages/${params.villageUuid}/HAS_INSTITUTION/institutions`,
          bodyFormData,
          {
            headers: {
              authorization: "Bearer " + access_token,
              "content-type": `multipart/form-data`,
            },
          }
        );
        return response.data;
      } else {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/institutions/${params.uuid}`,
          bodyFormData,
          {
            headers: {
              authorization: "Bearer " + access_token,
              "content-type": `multipart/form-data`,
            },
          }
        );
        return response.data;
      }

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.statusText);
    }
  }
);

export const submitVideo = createAsyncThunk(
  "admin/submitVideo",
  async (
    params: {
      video: any;
      villageUuid: string;
      uuid: string;
    },
    thunkAPI
  ) => {
    try {
      const access_token = getUserToken();

      const bodyFormData = new FormData();
      bodyFormData.append("name", params.video.name);
      bodyFormData.append("description", params.video.description);
      
      if (!params.uuid) {
        bodyFormData.append("url", params.video.avatar);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/locations/${params.villageUuid}/HAS_MEDIA/videos`,
          bodyFormData,
          {
            headers: {
              authorization: "Bearer " + access_token,
              "content-type": `multipart/form-data`,
            },
          }
        );

        return response.data;
      } else {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/videos/${params.uuid}`,
          bodyFormData,
          {
            headers: {
              authorization: "Bearer " + access_token,
              "content-type": `multipart/form-data`,
            },
          }
        );
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.statusText);
    }
  }
);

export const deleteObj = createAsyncThunk(
  "admin/deleteObj",
  async (params: any, thunkAPI) => {
    try {
      const endpoint = `/${params?.type}/${params?.uuid}`;
      const response = await axiosAuth.delete(`/api/entry`, {
        params: { endpoint },
      });
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/************************************* */
const initialState: AdminState = {
  status: Status.IDLE,
  posts: [],
  stories: [],
  personalities: [],
  institutions: [],
  videos: [],
  photos: [],
  users: [],
  pmusers: [],
  delStatus: null,
  error: null
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    init: (state) => {
      state.delStatus = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchStories.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchStories.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.stories = action.payload;
    });
    builder.addCase(fetchStories.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchPersonalities.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchPersonalities.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.personalities = action.payload;
    });
    builder.addCase(fetchPersonalities.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchInstitutions.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchInstitutions.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.institutions = action.payload;
    });
    builder.addCase(fetchInstitutions.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchVideos.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.videos = action.payload;
    });
    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchPhotos.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.photos = action.payload;
    });
    builder.addCase(fetchPhotos.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(fetchPmusers.pending, (state) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(fetchPmusers.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.pmusers = action.payload;
    });
    builder.addCase(fetchPmusers.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(submitStory.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(submitStory.fulfilled, (state, action) => {
      state.status = Status.IDLE;
    });
    builder.addCase(submitStory.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(submitPersonality.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(submitPersonality.fulfilled, (state, action) => {
      state.status = Status.IDLE;
    });
    builder.addCase(submitPersonality.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(submitInstitution.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(submitInstitution.fulfilled, (state, action) => {
      state.status = Status.IDLE;
    });
    builder.addCase(submitInstitution.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(submitVideo.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(submitVideo.fulfilled, (state, action) => {
      state.status = Status.IDLE;
    });
    builder.addCase(submitVideo.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
    builder.addCase(deleteObj.pending, (state, action) => {
      state.status = Status.LOADING;
      state.error = null;
    });
    builder.addCase(deleteObj.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.delStatus = action.payload;
    });
    builder.addCase(deleteObj.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload;
    });
  },
});

export const { reset, init } = adminSlice.actions;
