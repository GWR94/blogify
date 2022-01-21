import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddCommentAction,
  AddPostAction,
  PostsState,
  SetCommentsAction,
  UpdateCommentAction,
  DeleteCommentAction,
  EditPostAction,
  LoadMorePostsAction,
  Post,
  RemovePostAction,
  SetPostsAction,
  SetPublicPostsAction,
} from "../store/posts.i";

const initialState: PostsState = {
  posts: [],
  nextToken: null,
  comments: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<AddPostAction>) => {
      return {
        ...state,
        posts: [...state.posts, action.payload.post],
      };
    },
    setComments: (state, action: PayloadAction<SetCommentsAction>) => {
      return {
        ...state,
        comments: action.payload.comments,
      };
    },
    addComment: (state, action: PayloadAction<AddCommentAction>) => {
      return {
        ...state,
        comments: [...state.comments, action.payload.comment],
      };
    },
    updateComment: (state, action: PayloadAction<UpdateCommentAction>) => {
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.id) {
            return {
              ...comment,
              ...action.payload.updates,
            };
          }
          return comment;
        }),
      };
    },
    deleteComment: (state, action: PayloadAction<DeleteCommentAction>) => {
      return {
        ...state,
        comments: state.comments.filter((post) => post.id !== action.payload.id),
      };
    },
    removePost: (state, action: PayloadAction<RemovePostAction>) => {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload.id),
      };
    },
    loadMorePosts: (state, action: PayloadAction<LoadMorePostsAction>) => {
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        nextToken: action.payload.nextToken,
      };
    },
    editPost: (state, action: PayloadAction<EditPostAction>) => {
      return {
        ...state,
        posts: state.posts.map((post: Post) => {
          if (post.id === action.payload.id) {
            return {
              ...post,
              ...action.payload.updates,
            };
          }
          return post;
        }),
      };
    },
    setPosts: (state, action: PayloadAction<SetPostsAction>) => {
      return {
        ...state,
        posts: action.payload.posts,
        nextToken: action.payload.nextToken,
      };
    },
    setPublicPosts: (state, action: PayloadAction<SetPublicPostsAction>) => {
      return {
        ...state,
        posts: action.payload.posts,
        nextToken: action.payload.nextToken,
      };
    },
  },
});

export const {
  addPost,
  setComments,
  addComment,
  updateComment,
  deleteComment,
  removePost,
  loadMorePosts,
  editPost,
  setPosts,
  setPublicPosts,
} = postsSlice.actions;
