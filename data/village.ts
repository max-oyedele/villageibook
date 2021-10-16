import { User } from "types/schema";
import { Post, Article, Personality, Institution, Video } from "types/data";

export const users: User[] = [
  {
    id: 0,
    firstName: "abdul",
    lastName: "ullah",    
    avatar: "/images/abdul.png",
    email: "abdul@gmail.com",
    password: "123",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
    details: {
      photos: [
        "/images/myphoto1.png",
        "/images/myphoto2.png",
        "/images/myphoto3.png",
      ],
    },
    comesFrom: "jammura",    
    graduatedAt: "Sydney University",    
    degree: "master",
    uuid: "23423",
    role: "premium",
  },
  {
    id: 1,
    firstName: "sadia",
    lastName: "ullah",    
    avatar: "/images/sadia.png",
    email: "sadia@gmail.com",
    password: "123",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
    details: {
      photos: [
        "/images/myphoto1.png",
        "/images/myphoto2.png",
        "/images/myphoto3.png",
      ],
    },
    comesFrom: "jammura",
    uuid: "23455"
  },
  {
    id: 2,
    firstName: "taslim",
    lastName: "ahmed",    
    avatar: "/images/taslim.png",
    email: "taslim@gmail.com",
    password: "123",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
    details: {
      photos: [
        "/images/myphoto1.png",
        "/images/myphoto2.png",
        "/images/myphoto3.png",
      ],
    },
    comesFrom: "jammura",    
    graduatedAt: "oxford University",    
    degree: "bachelor's",
    uuid: "43534",
    role: "premium",
  },
  {
    id: 3,
    firstName: "sarmin",
    lastName: "ahmed",    
    avatar: "/images/sarmin.png",
    email: "sarmin@gmail.com",
    password: "123",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
    details: {
      photos: [
        "/images/myphoto1.png",
        "/images/myphoto2.png",
        "/images/myphoto3.png",
      ],
    },
    comesFrom: "village1",
    uuid: "345435",
    role: "premium",
  },
  {
    id: 4,
    firstName: "sonia",
    lastName: "bahmi",    
    avatar: "/images/sonia.png",
    email: "sonia@gmail.com",
    password: "123",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
    details: {
      photos: [
        "/images/myphoto1.png",
        "/images/myphoto2.png",
        "/images/myphoto3.png",
      ],
    },
    comesFrom: "village2",    
    graduatedAt: "bangladesh national University",    
    uuid: "345435"
  },
];

export const articles: Article[] = [
  {
    id: 0,
    title: "Amet minim mollit non deserunt minim mollit non.",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam nostrud consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Exercitation veniam sunt nostrud amet.",
    img: "/images/society-card1.png",
    village: "jammura"
  },
  {
    id: 1,
    title: "Amet minim mollit non deserunt minim mollit non.",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam nostrud consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Exercitation veniam sunt nostrud amet.",
    img: "/images/society-card2.png",
    village: "village1"
  },
  {
    id: 2,
    title: "Amet minim mollit non deserunt minim mollit non.",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam nostrud consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Exercitation veniam sunt nostrud amet.",
    img: "/images/society-card2.png",
    village: "jammura"
  },
  {
    id: 3,
    title: "Amet minim mollit non deserunt minim mollit non.",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam nostrud consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Exercitation veniam sunt nostrud amet.",
    img: "/images/society-card1.png",
    village: "village2"
  },
  {
    id: 4,
    title: "Amet minim mollit non deserunt minim mollit non.",
    desc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam nostrud consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit. Exercitation veniam sunt nostrud amet.",
    img: "/images/society-card2.png",
    village: "village2"
  },
];

export const personalities: Personality[] = [
  {
    id: 0,
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
    village: "jammura",
  },
  {
    id: 1,
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
    village: "village1",
  },
  {
    id: 2,
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
    village: "village2",
  },
  {
    id: 3,
    name: "sarmin ahamed",
    img: "/images/sarmin.png",
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
    village: "jammura",
  },
  {
    id: 4,
    name: "sonia bahmi",
    img: "/images/sonia.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum.",
    details: {
      photos: [
        "/images/myphoto1.png",
        "/images/myphoto2.png",
        "/images/myphoto3.png",
        "/images/myphoto3.png",
      ],
    },
    village: "jammura",
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
    village: "village1",
  },
  {
    id: 1,
    category: "category",
    name: "institution name",
    img: "/images/institution-card2.png",
    address: "Dhanmondi. 32 Dhaka-1209 Bangladesh",
    phone: "880-2-981100",
    village: "jammura",
  },
  {
    id: 2,
    category: "category",
    name: "institution name",
    img: "/images/institution-card3.png",
    address: "Dhanmondi. 32 Dhaka-1209 Bangladesh",
    phone: "880-2-981100",
    village: "jammura",
  },
];

export const videos: Video[] = [
  {
    id: 0,
    title: "video title",
    author: "author",
    img: "/images/video-card1.png",
    village: "jammura",
  },
  {
    id: 1,
    title: "video title",
    author: "author",
    img: "/images/video-card2.png",
    village: "village1",
  },
  {
    id: 2,
    title: "video title",
    author: "author",
    img: "/images/video-card3.png",
    village: "jammura",
  },
  {
    id: 3,
    title: "video title",
    author: "author",
    img: "/images/video-card4.png",
    village: "jammura",
  },
  {
    id: 4,
    title: "video title",
    author: "author",
    img: "/images/video-card5.png",
    village: "jammura",
  },
  {
    id: 5,
    title: "video title",
    author: "author",
    img: "/images/video-card6.png",
    village: "jammura",
  },
];
