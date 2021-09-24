import { Post } from "types/data";

export const posts: Post[] = [
  {
    id: 0,
    user: {
      id: 0,
      name: "abdul ullah",
      img: "/images/abdul.png",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
      role: "premium",
      village: "fatepur",
      uuid: "8897"
    },
    lastAt: "3 hours ago",
    contents: {
      text: "Consequat duis enim velit mollit. Exercitation veniam consequat sunt. Consequat duis enim velit mollit. Exercitation veniam consequat sunt.Consequat duis enim velit mollit. Exercitation veniam consequat sunt.Consequat duis enim velit mollit. Exercitation veniam consequat sunt.Consequat duis enim velit mollit. Exercitation veniam consequat sunt.Consequat duis enim velit mollit. Exercitation veniam consequat sunt.",
      img: "/images/abdul-post.png",
      video: null,
    },
    village: "jammura",
  },
  {
    id: 1,
    user: {
      id: 1,
      name: "sadia ullah",
      img: "/images/sadia.png",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
      village: "kumri",
      uuid: "42342"
    },
    lastAt: "5 hours ago",
    contents: {
      text: "Consequat duis enim velit mollit. Exercitation veniam consequat sunt.",
      img: "/images/sadia-post1.png",
      video: {
        id: 0,
        title: "video title",
        author: "author",
        img: "/images/sadia-post2.png",
        village: "jammura"
      },
    },
    village: "jammura",
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "taslim ahamed",
      img: "/images/taslim.png",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
      role: "premium",
      village: "mulaid",
      uuid: "3454"
    },
    lastAt: "1 day ago",
    contents: {
      text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim.",
      img: "/images/taslim-post.png",
      video: null,
    },
    village: "chittagong",
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "sarmin ahamed",
      img: "/images/sarmin.png",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
      role: "premium",
      village: "khulna",
      uuid: "2345"
    },
    lastAt: "1 day ago",
    contents: {
      text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim.",
      img: "/images/sarmin-post.png",
      video: null,
    },
    village: "jammura",
  },
  {
    id: 4,
    user: {
      id: 4,
      name: "sonia bahmi",
      img: "/images/sonia.png",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
      village: "Rajshahi",
      uuid: "1234"
    },
    lastAt: "1 day ago",
    contents: {
      text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim.",
      img: "",
      video: {
        id: 1,
        title: "video title",
        author: "author",
        img: "/images/sonia-post.png",
        village: "jammura"
      },
    },
    village: "jammura",
  },
];

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

export const recentUsers = [
  {
    id: 0,
    name: "sarmin begum",
    img: "/images/sarmin.png",
    recentAt: 1,
    uuid: "3355"
  },
  {
    id: 1,
    name: "Nusrat Rahman",
    img: "/images/sonia.png",
    recentAt: 2,
    uuid: "34555"
  },
];

export const totalGraduates = 1000;
export const village = {
  id: 0,
  name: "",
  href: "",
  uuid: "000",
  img: "",
  recentAt: 0
};
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
