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