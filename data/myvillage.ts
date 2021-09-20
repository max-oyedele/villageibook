import { User, Post, Article, Institution, Video } from "types/data";

export const myVillageStats: any = {
  posts: 202,
  graduates: 124,
  society: 520,
  personalities: 89,
  institutions: 17,
  videos: 489,
};

export const articles: Article[] = [
  {
    id: 0,
    title: "Amet minim mollit non deserunt minim mollit non.",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam nostrud consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Exercitation veniam sunt nostrud amet.",
    img: "/images/society-card1.png",
  },
  {
    id: 1,
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
    id: 3,
    title: "Amet minim mollit non deserunt minim mollit non.",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam nostrud consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Exercitation veniam sunt nostrud amet.",
    img: "/images/society-card1.png",
  },
  {
    id: 4,
    title: "Amet minim mollit non deserunt minim mollit non.",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam nostrud consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Exercitation veniam sunt nostrud amet.",
    img: "/images/society-card2.png",
  },
];

export const personalities: User[] = [
  {
    id: 0,
    location: "fatepur",
    name: "abdul ullah",
    img: "/images/abdul.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
    role: "premium",
    details: {
      photos: [
        "/images/myphoto1.png",
        "/images/myphoto2.png",
        "/images/myphoto3.png",
        "/images/myphoto3.png",
      ],
    },
  },
  {
    id: 1,
    location: "kumri",
    name: "sadia ullah",
    img: "/images/sadia.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
    details: {
      photos: [
        "/images/myphoto1.png",
        "/images/myphoto2.png",
        "/images/myphoto3.png",
        "/images/myphoto3.png",
      ],
    },
  },
  {
    id: 2,
    location: "mulaid",
    name: "taslim ahamed",
    img: "/images/taslim.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
    role: "premium",
    details: {
      photos: [
        "/images/myphoto1.png",
        "/images/myphoto2.png",
        "/images/myphoto3.png",
        "/images/myphoto3.png",
      ],
    },
  },
];

export const institutions: Institution[] = [
  {
    id: 0,
    category: "category",
    name: "institution name",
    img: "/images/institution-card1.png",
    address: "Dhanmondi. 32 Dhaka-1209 Bangladesh",
    phone: "880-2-981100",
  },
  {
    id: 1,
    category: "category",
    name: "institution name",
    img: "/images/institution-card2.png",
    address: "Dhanmondi. 32 Dhaka-1209 Bangladesh",
    phone: "880-2-981100",
  },
  {
    id: 2,
    category: "category",
    name: "institution name",
    img: "/images/institution-card3.png",
    address: "Dhanmondi. 32 Dhaka-1209 Bangladesh",
    phone: "880-2-981100",
  },
];

export const videos: Video[] = [
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
];
