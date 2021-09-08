import {
  ADD_POST,
  EDIT_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  SET_COMMENTS,
  SET_POSTS,
  SET_PUBLIC_POSTS,
  REMOVE_POST,
  Post,
  PostsState,
  PostsActionTypes,
  LOAD_MORE_POSTS,
} from "../store/posts.i";

const defaultState: PostsState = {
  posts: [],
  nextToken: null,
  comments: [],
};

export default (state = defaultState, action: PostsActionTypes): PostsState => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.post],
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.comment],
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.id) {
            return {
              ...comment,
              ...action.updates,
            };
          }
          return comment;
        }),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.id),
      };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.id),
      };
    case LOAD_MORE_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.posts],
        nextToken: action.nextToken,
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post: Post) => {
          if (post.id === action.id) {
            return {
              ...post,
              ...action.updates,
            };
          }
          return post;
        }),
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts,
        nextToken: action.nextToken,
      };
    case SET_PUBLIC_POSTS:
      return {
        ...state,
        posts: action.posts,
        nextToken: action.nextToken,
      };
    default:
      return state;
  }
};
