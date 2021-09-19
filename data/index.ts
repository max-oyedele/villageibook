import { Video } from "data/myPage";

export const recentVillages = [
  {
    id: 0,
    name: "Syedpur",
    img: "/images/village-card1.png",
    recentAt: 1,
  },
  {
    id: 1,
    name: "Panchpara",
    img: "/images/village-card2.png",
    recentAt: 2,
  },
  {
    id: 2,
    name: "Rasulpur",
    img: "/images/village-card1.png",
    recentAt: 4,
  },
];

export type Post = {
  id: number;
  user: {
    id: number;
    name: string;
    img: string;
  };
  ago: string;
  contents: {
    text: string;
    img: string;
    video: Video;
  };
};
export const posts: Post[] = [
  {
    id: 0,
    user: { id: 0, name: "sadia rashid", img: "/images/sadia.png" },
    ago: "3 hours ago",
    contents: {
      text: "Consequat duis enim velit mollit. Exercitation veniam consequat sunt.",
      img: "/images/nusrat-post.png",
      video: null
    },
  },
  {
    id: 1,
    user: { id: 1, name: "abdul ullah", img: "/images/abdul.png" },
    ago: "5 hours ago",
    contents: {
      text: "Consequat duis enim velit mollit. Exercitation veniam consequat sunt.",
      img: "/images/sarmin-post1.png",
      video: {
        id: 0,
        title: "video title",
        author: "author",
        img: "/images/sarmin-post2.png",
      },
    },
  },
  {
    id: 2,
    user: { id: 2, name: "Taslima ahamed", img: "/images/taslima.png" },
    ago: "1 day ago",
    contents: {
      text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim.",
      img: "/images/sonia-post.png",
      video: null,
    },
  },
];

export const recentUsers = [
  {
    id: 0,
    name: "sarmin begum",
    img: "/images/sarmin.png",
    recentAt: 1,
  },
  {
    id: 1,
    name: "Nusrat Rahman",
    img: "/images/sonia.png",
    recentAt: 2,
  },
];

export const totalGraduates = 1000;
export const villageName = "jammura";
export const villageGraduates = 124;
export const bangladeshGraduates = {
  barisal: {
    inter: 12,
    oversea: 12,
  },
  chittagong: {
    inter: 11,
    oversea: 2,
  },
  dhaka: {
    inter: 10,
    oversea: 14,
  },
  khulna: {
    inter: 21,
    oversea: 5,
  },
  mymensingh: {
    inter: 16,
    oversea: 11,
  },
  rajshahi: {
    inter: 18,
    oversea: 8,
  },
  rangpur: {
    inter: 14,
    oversea: 13,
  },
  sylhet: {
    inter: 13,
    oversea: 13,
  },
};

export const countryGraduates = {
  africa: 12,
  asia: 8,
  australia: 26,
  europe: 78,
  USA: 3,
  canada: 1,
  UK: 10,
  bangladesh: 130,
};
