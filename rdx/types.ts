import {
  SerializedError,
} from "@reduxjs/toolkit";

import {User, Country, Region, District, SubDistrict, Village, University, Profession} from "types/schema"
import {Post, Article, Institution, Video, Personality} from "types/data"

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  PENDING = 'pending',
  ERROR = 'error',
}

export enum Step {
  STEP1 = 'signup',
  STEP2 = 'fill form',
  COMPLETED = 'complete 2 steps'
}

export interface AuthState {
  jwt: any;
  status: Status;
  me?: User;
  error?: SerializedError;
}

export interface UserState {
  status: Status;
  me: User;
  meStep: Step;
  meError: SerializedError;
  user?: User;
  userError: SerializedError;
}
export interface LocationState {
  status: Status;
  countries: Country[];
  regions: Region[];
  districts: District[];
  subDistricts: SubDistrict[];
  villages: Village[];
  universities: University[];
  professions: Profession[];
  error?: SerializedError;
}
export interface FeedPageState {
  status: Status;
  pageData: {
    posts: Post[];
    recentVillages: Village[];
    recentUsers: User[];
  };
  error?: SerializedError;
}
export interface VillagePageState {
  status: Status;
  pageData: {
    users: User[];
    graduates: User[];
    articles: Article[];
    personalities: Personality[];
    institutions: Institution[];
    videos: Video[];
  };
  error?: SerializedError;
}

export interface GraduatePageState {
  status: Status;
  pageData: {
    totalGraduates: User[];
  };
  error?: SerializedError;
}