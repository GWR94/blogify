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
  createdAt?: string;
  overview: string;
  tags: string[];
  title: string;
  userID?: string;
  public: boolean;
}

export interface S3Image {
  key: string;
  bucket: string;
  region: string;
}

export interface UpdateCommentAction {
  id: string;
  updates: Partial<Comment>;
}

export interface AddPostAction {
  post: Post;
}

export interface SetCommentsAction {
  comments: Comment[];
}

export interface DeleteCommentAction {
  id: string;
}

export interface AddCommentAction {
  comment: Comment;
}

export interface RemovePostAction {
  id: string;
}

export interface EditPostAction {
  id: string;
  updates: Partial<Post>;
}

export interface SetPostsAction {
  posts: Post[];
  nextToken: string | null;
}

export interface SetPublicPostsAction {
  posts: Post[];
  nextToken: string | null;
}

export interface LoadMorePostsAction {
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
