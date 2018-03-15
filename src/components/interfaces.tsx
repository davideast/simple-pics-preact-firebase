
export interface User {
  displayName: string;
  photoURL: string;
  uid: string;
}

export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type AppUser = Partial<User>;

export interface UserProp {
  user: AppUser;
}

export interface PathProp {
  path: string;
}
