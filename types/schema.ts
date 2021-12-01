export type User = {
  id: number;
  firstName: string;
  lastName: string;
  avatar?: string;
  email: string;
  password: string;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  about?: string;
  comesFrom?: Village;
  livesIn?: Country;
  graduatedAt?: University;
  profession?: string;
  degree?: string;
  recentAt?: number;
  uuid: string;
  role?: string;
};

export type Country = {
  id: number;
  name: string;
  href: string;
  uuid: string;
};

export type Region = {
  id: number;
  name: string;
  href: string;
  uuid: string;
};

export type District = {
  id: number;
  name: string;
  href: string;
  uuid: string;
};

export type SubDistrict = {
  id: number;
  name: string;
  href: string;
  uuid: string;
};

export type Village = {
  id: number;
  name: string;
  href?: string;
  uuid?: string;
  img?: string;
  recentAt?: number;
};

export type University = {
  id: number;
  name: string;
  href: string;
  uuid: string;
};

export type Degree = {
  id: number;
  name: string;
};

export type Profession = {
  id: number;
  name: string;
  href: string;
  uuid: string;
};

export type Comment = {
  commentUser: User;
  text: string;
};

export type Personality = {
  id: number;
  name: string;
  about?: string;
  photo?: {
    url?: string;
    name?: string;
    description?: string;
  };
  video?: {
    url?: string;
    name?: string;
    description?: string;
  };
  dateOfBirth?: string;
  dateOfDeath?: string;
  educationLife?: string;
  achievements?: string;
  career?: string;
  uuid: string;
};

export type Institution = {
  id: number;
  name: string;
  photo?: {
    url?: string;
    name?: string;
    description?: string;
  };
  video?: {
    url?: string;
    name?: string;
    description?: string;
  };
  yearEstablished?: string;
  address: string;
  email?: string;
  phone?: string;
  history?: string;
  href?: string;
  uuid: string;
};
