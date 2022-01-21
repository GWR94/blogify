import { configureStore, Store, compose } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth.reducer";
import postsReducer from "../reducers/posts.reducer";
import filtersReducer from "../reducers/filters.reducer";
import { AuthState } from "./auth.i";
import { FiltersState } from "./filters.i";
import { PostsState } from "./posts.i";
import { authSlice } from "../slices/auth.slice";
import { postsSlice } from "../slices/post.slice";
import { filtersSlice } from "../slices/filter.slice";

declare global {
  interface Window {
    // eslint-disable-next-line no-undef
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface GraphQLResult<T = Record<string, unknown>> {
  data?: T;
  errors?: [Record<string, unknown>];
  extensions?: {
    [key: string]: any;
  };
}

export interface AppState {
  auth: AuthState;
  posts: PostsState;
  filters: FiltersState;
}

export type RootState = ReturnType<typeof store.getState>;

export const store: Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    posts: postsSlice.reducer,
    filters: filtersSlice.reducer,
  },
});

export default store;
