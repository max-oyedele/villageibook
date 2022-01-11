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
  Institution
} from "types/schema";
import { Post, Video } from "types/data";
import { SVGFactory } from "react";

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  PENDING = "pending",
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

export interface ViewState {
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
export interface PostState {
  status: Status;
  error: SerializedError;
  addPost: null;
}
export interface FeedPageState {
  status: Status;
  posts: Post[];
  recentVillages: Village[];
  recentUsers: User[];
  error?: SerializedError;
}
export interface VillagePageState {
  status: Status;
  village: Village;
  villageUsers: User[];
  villageGraduates: User[];
  villageStories: Story[];
  villagePersonalities: Personality[];
  villageInstitutions: Institution[];
  villageVideos: Video[];
  error?: SerializedError;
}

export interface GraduatePageState {
  status: Status;  
  graduateStatsByCondition: {
    graduates: number;
    location: string;
  }[];
  totalGraduateStats: {
    graduates: number;
    location: string;
  }[];
  error?: SerializedError;
}
export interface AdminState {
  status: Status;
  posts: Post[];
  stories: Story[];
  personalities: Personality[];
  institutions: Institution[];
  videos: Video[];
  users: User[];
  error?: SerializedError;
  delStatus: string;
  addPersonality: null;
  editPersonality: null;
  addStory: null;
  editStory: null;
  addInstitution: null;
  editInstitution: null;
  addVideo: null;
  editVideo: null;
}