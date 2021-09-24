export type Country = {
  id: number;
  name: string;
  href: string;
  uuid: string;
}

export type Region = {
  id: number;
  name: string;
  href: string;
  uuid: string;
}

export type District = {
  id: number;
  name: string;
  href: string;
  uuid: string;
}

export type SubDistrict = {
  id: number;
  name: string;
  href: string;
  uuid: string;
}

export type Village = {
  id: number;
  name: string;
  href?: string;
  uuid?: string;
  img?: string;
  recentAt?: number;
}

export type Degree = {
  id: number;
  label: string;
  value: string;
};
