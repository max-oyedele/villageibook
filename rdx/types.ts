import {
  SerializedError,
} from "@reduxjs/toolkit";

import {User, Country, Region, District, SubDistrict, Village} from "types/schema"
import {Post, Article, Institution, Video, Personality} from "types/data"

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
  user?: User;
  error?: SerializedError;
}
export interface LocationState {
  status: Status;
  countries: Country[];
  regions: Region[];
  districts: District[];
  subDistricts: SubDistrict[];
  villages: Village[];
  error?: SerializedError;
}
export interface FeedPageState {
  status: Status;
  pageData: {
    posts: Post[];
    recentVillages: Village[];
    recentUsers: User[];
    totalGraduates: number;
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
    graduates: User[];
    articles: Article[];
    personalities: Personality[];
    institutions: Institution[];
    videos: Video[];
  };
  error?: SerializedError;
}