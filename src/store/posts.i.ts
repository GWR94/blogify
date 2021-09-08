export const GET_POST = "GET_POST";
export const ADD_POST = "ADD_POST";
export const REMOVE_POST = "REMOVE_POST";
export const EDIT_POST = "EDIT_POST";
export const SET_POSTS = "SET_POSTS";
export const SET_PUBLIC_POSTS = "SET_PUBLIC_POSTS";
export const SET_COMMENTS = "SET_COMMENTS";
export const UPDATE_COMMENT = "UPDATE_COMMENTS";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";
export const LOAD_MORE_POSTS = "LOAD_MORE_POSTS";

export interface PostsState {
  posts: Post[];
  nextToken: string | null;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  likes: string[];
  postID: string;
  userID: string;
}

export interface Post {
  author: string;
  body: string;
  email: string;
  id?: string;
  createdAt: string;
  overview: string;
  tags: string[];
  title: string;
  userID?: string;
  public: boolean;
}

export interface UpdateCommentAction {
  type: typeof UPDATE_COMMENT;
  id: string;
  updates: Partial<Comment>;
}

export interface AddPostAction {
  type: typeof ADD_POST;
  post: Post;
}

export interface SetCommentsAction {
  type: typeof SET_COMMENTS;
  comments: Comment[];
}

export interface DeleteCommentAction {
  type: typeof DELETE_COMMENT;
  id: string;
}

export interface AddCommentAction {
  type: typeof ADD_COMMENT;
  comment: Comment;
}

export interface RemovePostAction {
  type: typeof REMOVE_POST;
  id: string;
}

export interface EditPostAction {
  type: typeof EDIT_POST;
  id: string;
  updates: Partial<Post>;
}

export interface SetPostsAction {
  type: typeof SET_POSTS;
  posts: Post[];
  nextToken: string | null;
}

export interface SetPublicPostsAction {
  type: typeof SET_PUBLIC_POSTS;
  posts: Post[];
  nextToken: string | null;
}

export interface LoadMorePostsAction {
  type: typeof LOAD_MORE_POSTS;
  posts: Post[];
  nextToken: string | null;
}

export declare type PostsActionTypes =
  | SetPostsAction
  | SetPublicPostsAction
  | EditPostAction
  | RemovePostAction
  | AddPostAction
  | AddCommentAction
  | UpdateCommentAction
  | DeleteCommentAction
  | SetCommentsAction
  | LoadMorePostsAction;
