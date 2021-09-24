export type User = {
  id: number;
  name: string;
  img: string;
  role?: string;
  details?: {
    photos: string[]
  };
  desc?: string;
  village?: string;
  recentAt?: number;
  uuid: string;
}

export type Post = {
  id: number;
  user: User;
  lastAt: string;
  contents: {
    text: string;
    img: string;
    video: Video;
  };
  village?: string;
};

export type Article = {
  id: number;
  title: string;
  desc: string;
  img: string;
  village?: string;
};

export type Personality = {
  id: number;
  name: string;
  img: string;
  role?: string;
  details?: {
    photos: string[]
  };
  desc?: string;
  village?: string
}

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
  img: string;
  village?: string;
}