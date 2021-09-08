import {
  ADD_POST,
  REMOVE_POST,
  EDIT_POST,
  SET_POSTS,
  SET_PUBLIC_POSTS,
  Post,
  AddPostAction,
  EditPostAction,
  RemovePostAction,
  SetPostsAction,
  SetPublicPostsAction,
  AddCommentAction,
  ADD_COMMENT,
  DeleteCommentAction,
  DELETE_COMMENT,
  SetCommentsAction,
  SET_COMMENTS,
  Comment,
  UPDATE_COMMENT,
  UpdateCommentAction,
  LoadMorePostsAction,
  LOAD_MORE_POSTS,
} from "../store/posts.i";

export const addPost = (post: Post): AddPostAction => ({
  type: ADD_POST,
  post,
});

export const setComments = (comments: Comment[]): SetCommentsAction => ({
  type: SET_COMMENTS,
  comments,
});

export const deleteComment = (id: string): DeleteCommentAction => ({
  type: DELETE_COMMENT,
  id,
});

export const updateComment = (
  id: string,
  updates: Partial<Comment>,
): UpdateCommentAction => ({
  type: UPDATE_COMMENT,
  id,
  updates,
});

export const addComment = (comment: Comment): AddCommentAction => ({
  type: ADD_COMMENT,
  comment,
});

export const removePost = (id: string): RemovePostAction => ({
  type: REMOVE_POST,
  id,
});

export const editPost = (id: string, updates: Partial<Post>): EditPostAction => ({
  type: EDIT_POST,
  id,
  updates,
});

export const setPosts = (posts: Post[], nextToken: string | null): SetPostsAction => ({
  type: SET_POSTS,
  posts,
  nextToken,
});

export const loadMorePosts = (
  posts: Post[],
  nextToken: string | null,
): LoadMorePostsAction => ({
  type: LOAD_MORE_POSTS,
  posts,
  nextToken,
});

export const setPublicPosts = (
  posts: Post[],
  nextToken: string | null,
): SetPublicPostsAction => ({
  type: SET_PUBLIC_POSTS,
  posts,
  nextToken,
});
