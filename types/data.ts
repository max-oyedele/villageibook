import { User, Comment } from "types/schema";

export type Post = {
  id: number;
  user?: User;
  lastUpdated: string;
  content: string;
  picture: string;
  video: string;
  comments: Comment[];
  uuid: string;
};

export type Video = {
  id: number;
  title: string;
  name: string;
  description: string;
  url: string;
  author: string;
  video: string;
  village?: string;
};
