import { User } from '@firebase/auth-types';

type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type AppUser = Partial<User>;

export interface UserProp {
  user: AppUser;
}
