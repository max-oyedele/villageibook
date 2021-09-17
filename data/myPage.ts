export const myVillageStats: any = {
  myPage: 202,
  graduates: 124,
  society: 520,
  personalities: 89,
  institutions: 17,
  videos: 489,
};

export type MyPage = {
  id: number;
  region: string;
  name: string;
  img?: string;
  desc?: string;
  role: string;
  photos?: string[];
};

export const myPages: MyPage[] = [
  {
    id: 0,
    region: "fatepur",
    name: "sadia rashid",
    img: "/images/sadia.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
    role: "premium",
    photos: ["/images/myphoto1.png", "/images/myphoto2.png", "/images/myphoto3.png"]
  },
  {
    id: 1,
    region: "kumri",
    name: "abdul ullah",
    img: "/images/abdul.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
    role: "normal",
    photos: ["/images/myphoto1.png", "/images/myphoto2.png", "/images/myphoto3.png"]
  },
  {
    id: 2,
    region: "mulaid",
    name: "Taslima ahamed",
    img: "/images/taslima.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
    role: "premium"
  },
];

export type Society = {
  id: number;
  title: string;
  desc: string;
  img: string;
};
export const societies: Society[] = [
  {
    id: 0,
    title: "Amet minim mollit non deserunt minim mollit non.",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam nostrud consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Exercitation veniam sunt nostrud amet.",
    img: "/images/society-card1.png",
  },
  {
    id: 2,
    title: "Amet minim mollit non deserunt minim mollit non.",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam nostrud consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Exercitation veniam sunt nostrud amet.",
    img: "/images/society-card2.png",
  },
  {
    id: 2,
    title: "Amet minim mollit non deserunt minim mollit non.",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam nostrud consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Exercitation veniam sunt nostrud amet.",
    img: "/images/society-card2.png",
  },
  {
    id: 0,
    title: "Amet minim mollit non deserunt minim mollit non.",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam nostrud consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Exercitation veniam sunt nostrud amet.",
    img: "/images/society-card1.png",
  },
  {
    id: 2,
    title: "Amet minim mollit non deserunt minim mollit non.",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam nostrud consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Exercitation veniam sunt nostrud amet.",
    img: "/images/society-card2.png",
  },
];

export type Personality = {
  id: number;
  region: string;
  name: string;
  img?: string;
  desc?: string;
};

export const personalities: Personality[] = [
  {
    id: 0,
    region: "fatepur",
    name: "abdul ullah",
    img: "/images/abdul.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
  },
  {
    id: 1,
    region: "kumri",
    name: "sadia ullah",
    img: "/images/sadia.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
  },
  {
    id: 2,
    region: "mulaid",
    name: "taslim ahamed",
    img: "/images/taslim.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
  },
];

export type Institution = {
  id: number;
  category: string;
  name: string;
  img: string;
  address: string;
  phone: string;
};

export const institutions = [
  {
    id: 0,
    category: "category",
    name: "institution name",
    img: "/images/institution-card1.png",
    address: "Dhanmondi. 32 Dhaka-1209 Bangladesh",
    phone: "880-2-981100"
  },
  {
    id: 1,
    category: "category",
    name: "institution name",
    img: "/images/institution-card2.png",
    address: "Dhanmondi. 32 Dhaka-1209 Bangladesh",
    phone: "880-2-981100"
  },
  {
    id: 2,
    category: "category",
    name: "institution name",
    img: "/images/institution-card3.png",
    address: "Dhanmondi. 32 Dhaka-1209 Bangladesh",
    phone: "880-2-981100"
  },
]

export type Video = {
  id: number;
  title: string;
  author: string;
  img: string;
}

export const videos = [
  {
    id: 0,
    title: "video title",
    author: "author",
    img: "/images/video-card1.png",
  },
  {
    id: 1,
    title: "video title",
    author: "author",
    img: "/images/video-card2.png",
  },
  {
    id: 2,
    title: "video title",
    author: "author",
    img: "/images/video-card3.png",
  },
  {
    id: 3,
    title: "video title",
    author: "author",
    img: "/images/video-card4.png",
  },
  {
    id: 4,
    title: "video title",
    author: "author",
    img: "/images/video-card5.png",
  },
  {
    id: 5,
    title: "video title",
    author: "author",
    img: "/images/video-card6.png",
  },
]