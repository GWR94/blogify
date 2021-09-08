import { createStore, combineReducers, applyMiddleware, compose, Store } from "redux";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth.reducer";
import postsReducer from "../reducers/posts.reducer";
import filtersReducer from "../reducers/filters.reducer";
import { AuthState } from "./auth.i";
import { FiltersState } from "./filters.i";
import { PostsState } from "./posts.i";

declare global {
  interface Window {
    // eslint-disable-next-line no-undef
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth", "posts"],
};

export interface GraphQLResult<T = object> {
  data?: T;
  errors?: [object];
  extensions?: {
    [key: string]: any;
  };
}

export interface AppState {
  auth: AuthState;
  posts: PostsState;
  filters: FiltersState;
}

const rootReducer = combineReducers<AppState>({
  auth: authReducer,
  posts: postsReducer,
  filters: filtersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store: Store<AppState> = createStore<AppState>(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default (): { store: Store<AppState>; persistor: Persistor } => {
  const persistor: Persistor = persistStore(store);
  return { store, persistor };
};
