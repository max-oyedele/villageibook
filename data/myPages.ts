export const myVillageStats:any = {
  myPages: 202,
  graduates: 124,
  society: 520,
  personalities: 89,
  institutions: 17,
  videos: 489
}

export type MyPage = {
  id: number;
  region: string;
  user: {
    name: string;
    img?: string;
  };
  desc?: string
}

export const myPages:MyPage[] = [
  {
    id: 0,
    region: "fatepur",
    user: {
      name: "sadia rashid",
      img: "/images/sadia.png"
    },
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum."
  },
  {
    id: 1,
    region: "kumri",
    user: {
      name: "abdul ullah",
      img: "/images/abdul.png"
    },
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum."
  },
  {
    id: 2,
    region: "mulaid",
    user: {
      name: "Taslima ahamed",
      img: "/images/taslima.png"
    },
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id purus aliquam, molestie augue et, faucibus lectus. Aliquam augue ipsum."
  },
]
