import { Post } from "../store/posts.i";

export interface BlogPostFormState {
  id: string;
  title: string;
  overview: string;
  body: string;
  author: string;
  email: string;
  tags: string[];
  publicPost: boolean;
  error: {
    [key: string]: string;
  };
}

export interface BlogPostFormProps {
  post?: Post;
  startRemovePost?: (id: string) => void;
  onSubmit: (post: Post) => void;
}
