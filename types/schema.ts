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
  hasProfession?: Profession;
  degree?: string; //Degree;
  lastUpdated?: string;
  uuid: string;
  roles?: string[];
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

export type Photo = {
  url: string;
  name?: string;
  description?: string;
};

export type Video = {
  url: string;
  name?: string;
  description?: string;
};

export type Village = {
  id: number;
  name: string;
  heading?: string;
  description?: string;
  history?: string;
  photo?: Photo;
  video?: Video;
  href?: string;
  uuid: string;
  lastUpdated?: number;
};

export type University = {
  id: number;
  name: string;
  href: string;
  uuid: string;
};

export type Profession = {
  id: number;
  name: string;
  href: string;
  uuid: string;
};

export type Degree = {
  id: number;
  name: string;
  href: string;
  uuid: string;
};

export type Comment = {
  commentUser: User;
  text: string;
};

export type Story = {
  id: number;
  title: string;
  content?: string;
  href?: string;
  photo?: Photo;
  video?: Video;
  uuid: string;
}

export type Personality = {
  id: number;
  name: string;
  about?: string;
  photo?: Photo;
  video?: Video;
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
  photo?: Photo;
  video?: Video;
  yearEstablished?: string;
  address: string;
  email?: string;
  phone?: string;
  history?: string;
  href?: string;
  uuid: string;
};

export interface Session {
  amount_subtotal: number;
  amount_total: number;
  cancel_url: string;
  currency: string;
  id: string;
  success_url: string;
  url: string;
  statusCode: number;
  message: string;
}