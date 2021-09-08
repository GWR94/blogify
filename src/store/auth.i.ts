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

export interface LoginAction {
  type: typeof LOGIN;
  uid: string;
  name: string;
  email: string;
}

export interface UpdateUserAction {
  type: typeof UPDATE_USER;
  updates: Partial<AuthState>;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export declare type AuthActionTypes = LoginAction | LogoutAction | UpdateUserAction;
