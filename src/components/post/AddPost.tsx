import React from "react";
import { useDispatch } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { Container, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import BlogPostForm from "../common/BlogPostForm";
import { postsSlice } from "../../slices/post.slice";
import Header from "../common/Header";
import { createPost } from "../../graphql/mutations";
import { Post } from "../../store/posts.i";
import { GraphQLResult } from "../../store/store";
import { openSnackbar } from "../../utils/components/Notifier";

const AddPostPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (post: Post): Promise<void> => {
    try {
      const { data } = (await API.graphql(
        graphqlOperation(createPost, {
          input: post,
        }),
      )) as GraphQLResult<{ createPost: Post }>;
      if (data) {
        dispatch(postsSlice.actions.addPost({ post: data.createPost }));
        history.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      openSnackbar({
        severity: "error",
        message: "Unable to create post. Please try again.",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="page-header">
        <Container className="page-header__container">
          <Typography variant="h4" className="app__title">
            Create Post
          </Typography>
          <Typography variant="h6" gutterBottom className="app__subtitle">
            Let the world know what you&apos;ve got to say!
          </Typography>
          <Typography variant="subtitle2">
            Please complete all of the relevant fields to create your post.
          </Typography>
        </Container>
      </div>
      <Container>
        <BlogPostForm onSubmit={onSubmit} />
      </Container>
    </>
  );
};

export default AddPostPage;
