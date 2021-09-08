import { AuthState, LoginAction, LogoutAction, UpdateUserAction } from "../store/auth.i";

export const login = (uid: string, name: string, email: string): LoginAction => ({
  type: "LOGIN",
  uid,
  email,
  name,
});

export const logout = (): LogoutAction => ({
  type: "LOGOUT",
});

export const updateUser = (updates: Partial<AuthState>): UpdateUserAction => ({
  type: "UPDATE_USER",
  updates,
});
