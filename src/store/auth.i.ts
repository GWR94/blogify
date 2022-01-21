import { Post, S3Image } from "./posts.i";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER = "UPDATE_USER";

export interface AuthState {
  uid: string | null;
  name: string | null;
  email: string | null;
  following: string[];
  followers: string[];
}

export interface User {
  id?: string;
  username: string;
  email: string;
  name: string;
  following: string[];
  followers: string[];
  savedPosts: string[];
  posts?: {
    items: Post[];
  };
  profileImage: S3Image | null;
}

export interface LoginAction {
  uid: string;
  name: string;
  email: string;
}

export interface UpdateUserAction {
  updates: Partial<AuthState>;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export declare type AuthActionTypes = LoginAction | LogoutAction | UpdateUserAction;
