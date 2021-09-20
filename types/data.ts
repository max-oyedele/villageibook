export type User = {
  id: number;
  name: string;
  img: string;
  role?: string;
  details?: {
    photos: string[]
  };
  desc?: string;
  location?: string
}

export type Post = {
  id: number;
  user: User;
  village: string;
  lastAt: string;
  contents: {
    text: string;
    img: string;
    video: Video;
  };
};

export type Article = {
  id: number;
  title: string;
  desc: string;
  img: string;
};

export type Institution = {
  id: number;
  category: string;
  name: string;
  img: string;
  address: string;
  phone: string;
};

export type Video = {
  id: number;
  title: string;
  author: string;
  img: string;
}

