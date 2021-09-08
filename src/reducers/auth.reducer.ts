import { AuthState, AuthActionTypes, UPDATE_USER, LOGOUT, LOGIN } from "../store/auth.i";

export default (
  state = { uid: null, name: null, email: null, followers: [], following: [] },
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        uid: action.uid,
        name: action.name,
        email: action.email,
      };
    case LOGOUT:
      return {
        uid: null,
        name: null,
        email: null,
        followers: [],
        following: [],
      };
    case UPDATE_USER: {
      return {
        ...state,
        ...action.updates,
      };
    }
    default:
      return state;
  }
};
