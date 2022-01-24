import { SerializedError } from "@reduxjs/toolkit";

import {
  User,
  Country,
  Region,
  District,
  SubDistrict,
  Village,
  University,
  Profession,
  Story,
  Personality,
  Institution,
  Session
} from "types/schema";
import { Post, Video } from "types/data";
import { SVGFactory } from "react";

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export enum Step {
  STEP1 = "step1",
  STEP2 = "step2",
  COMPLETED = "completed",
}

export interface AuthState {
  jwt: any;
  status: Status;
  me?: User;
  error?: SerializedError;
}

export interface CheckoutSessionState {
  status: Status;
  session: Session;
  error?: SerializedError;
}

export interface AccountState {
  status: Status;
  me: User;
  step: Step;
  error: SerializedError;
}
export interface CommonState {
  status: Status;
  countries: Country[];
  regions: Region[];
  districts: District[];
  subDistricts: SubDistrict[];
  villages: Village[];
  universities: University[];
  professions: Profession[];
  degrees: string[];
  error?: SerializedError;
}
export interface FeedPageState {
  status: Status;
  postStatus: Status;
  posts: Post[];
  recentVillages: Village[];
  recentUsers: User[];
  error?: SerializedError;
}
export interface VillagePageState {
  status: Status;
  village: Village;
  villageUsers: User[];  
  villageStories: Story[];
  villagePersonalities: Personality[];
  villageInstitutions: Institution[];
  villageVideos: Video[];
  villagePhotos: Video[];
  error?: SerializedError;
}
export interface GraduatePageState {
  status: Status;  
  graduateStats: {
    country?: any;
    region?: any;
    district?: any;
    subDistrict?: any;
    village?: any;
  };
  error?: SerializedError;
}
export interface ViewPageState {
  status: Status;  
  user?: User;
  userError?: SerializedError;
  story?: Story;
  storyError?: SerializedError;
  personality?: Personality;
  personalityError?: SerializedError;
  institution?: Institution;
  institutionError?: SerializedError;
}
export interface AdminState {
  status: Status;
  posts: Post[];
  stories: Story[];
  personalities: Personality[];
  institutions: Institution[];
  videos: Video[];
  photos: Video[];
  users: User[];
  pmusers: User[];
  error?: SerializedError;
  delStatus: string;
}