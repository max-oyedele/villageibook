import { Post } from "types/data";
import { User, Village } from "types/schema";

export const posts: Post[] = [
  {
    id: 0,
    user: {
      id: 0,
      firstName: "abdul",
      lastName: "ullah",
      img: "/images/abdul.png",
      email: "abdul@gmail.com",
      password: "123",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
      village: "fatepur",
      uuid: "879a1f43-d496-43eb-a658-648071820d31",
      role: "premium",
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
      firstName: "sadia",
      lastName: "ullah",
      img: "/images/sadia.png",
      email: "sadia@gmail.com",
      password: "123",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
      village: "kumri",
      uuid: "42342",
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
        village: "jammura",
      },
    },
    village: "jammura",
  },
  {
    id: 2,
    user: {
      id: 2,
      firstName: "taslim",
      lastName: "ahamed",
      img: "/images/taslim.png",
      email: "taslim@gmail.com",
      password: "123",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
      village: "mulaid",
      uuid: "3454",
      role: "premium",
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
      firstName: "sarmin",
      lastName: "ahmed",
      img: "/images/sarmin.png",
      email: "sarmin@gmail.com",
      password: "123",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
      village: "khulna",
      uuid: "2345",
      role: "premium",
    },
    lastAt: "1 day ago",
    contents: {
      text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim.",
      img: "",
      video: null,
    },
    village: "jammura",
  },
  {
    id: 4,
    user: {
      id: 4,
      firstName: "sonia",
      lastName: "bahmi",
      img: "/images/sonia.png",
      email: "sonia@gmail.com",
      password: "123",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
      village: "Rajshahi",
      uuid: "1234",
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
        village: "jammura",
      },
    },
    village: "jammura",
  },
];

export const recentVillages: Village[] = [
  {
    id: 0,
    name: "Village1",
    href: "village1",
    img: "/images/village-card1.png",
    recentAt: 1,
  },
  {
    id: 1,
    name: "Village2",
    href: "village2",
    img: "/images/village-card2.png",
    recentAt: 2,
  },
];

export const recentUsers: User[] = [
  {
    id: 3,
    firstName: "sarmin",
    lastName: "ahmed",
    img: "/images/sarmin.png",
    email: "sarmin@gmail.com",
    password: "123",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
    village: "khulna",
    uuid: "2345",
    role: "premium",
    recentAt: 1
  },
  {
    id: 4,
    firstName: "sonia",
    lastName: "bahmi",
    img: "/images/sonia.png",
    email: "sonia@gmail.com",
    password: "123",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
    village: "Rajshahi",
    uuid: "1234",
    recentAt: 2
  },
];