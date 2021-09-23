import {
  SerializedError,
} from "@reduxjs/toolkit";

import {District, Upazila, Village} from "types/schema"
import {Post, Article, User, Institution, Video, Personality} from "types/data"

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  PENDING = 'pending',
  ERROR = 'error',
}

export enum Register {
  STEP1 = 'signup',
  STEP2 = 'fill form',
  COMPLETED = 'complete 2 steps'
}

export interface AuthState {
  jwt: any;
  status: Status;
  register: Register;
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

export interface BrowsePageState {
  status: Status;
  pageData: {
    posts: Post[];
    recentVillages: Village[];
    recentUsers: User[];
    totalGraduates: number;
    village: Village;
    villageGraduates: number;
    countryGraduates: any;
    bangladeshGraduates: any;
  };
  error?: SerializedError;
}
export interface VillagePageState {
  status: Status;
  pageData: {
    users: User[];
    articles: Article[];
    personalities: Personality[];
    institutions: Institution[];
    videos: Video[];
  };
  error?: SerializedError;
}