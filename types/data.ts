import { User } from "types/schema";

export type Post = {
  id: number;
  user?: User;
  lastUpdated: string;
  content: string;
  picture: string;
  video: string;
  uuid: string;
};

export type Article = {
  id: number;
  title: string;
  desc: string;
  img: string;
  village?: string;
};

export type Personality = User

export type Institution = {
  id: number;
  category: string;
  name: string;
  img: string;
  address: string;
  phone: string;
  village?: string;
};

export type Video = {
  id: number;
  title: string;
  author: string;
  video: string;
  village?: string;
};
