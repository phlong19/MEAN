export interface Post {
  id?: string;
  _id?: string;
  title?: string;
  content?: string;
  image?: string;
  author?: string;
}

export type ExtendedPost = Post & { isAuthor: boolean };
export interface CustomRoute {
  href: string;
  label: string;
}

export interface User {
  _id?: string;
  id?: string;
  username?: string;
  email?: string;
  password?: string;
}
