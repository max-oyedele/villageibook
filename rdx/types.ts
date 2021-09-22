import {
  SerializedError,
} from "@reduxjs/toolkit";

import {District, Upazila, Village} from "types/schema"
import {Post, Article, User, Institution, Video} from "types/data"

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  PENDING = 'pending',
  ERROR = 'error',
}

export interface AuthState {
  jwt: any;
  status: Status;
  user?: any;
  error?: SerializedError;
}

export interface RegionState {
  status: Status;
  regions: any[];
  error?: SerializedError;
}

export interface DistrictState {
  status: Status;
  districts: District[];
  error?: SerializedError;
}

export interface UpazilaState {
  status: Status;
  upazilas: Upazila[];
  error?: SerializedError;
}

export interface VillageState {
  status: Status;
  villages: Village[];
  error?: SerializedError;
}

export interface VillagePageState {
  status: Status;
  pageData: {
    posts: Post[];
    users: User[];
    articles: Article[];
    institutions: Institution[];
    videos: Video[];
  };
  error?: SerializedError;
}