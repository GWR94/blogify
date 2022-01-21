import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { Redirect, useHistory } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import BlogPostForm from "../common/BlogPostForm";
import { postsSlice } from "../../slices/post.slice";
import { AppState, GraphQLResult } from "../../store/store";
import { Post } from "../../store/posts.i";
import Header from "../common/Header";
import { updatePost } from "../../graphql/mutations";
import { openSnackbar } from "../../utils/components/Notifier";

interface EditPostProps {
  id: string;
}

const EditPostPage = ({ id }: EditPostProps): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { uid } = useSelector(({ auth }: AppState) => auth);
  const post = useSelector(({ posts }: AppState) =>
    posts.posts.find((post) => post.id === id),
  );

  useEffect(() => {
    if (post?.userID !== uid) {
      openSnackbar({
        severity: "error",
        message: "User not authorised to edit post.",
      });
      history.push("/dashboard");
    }
  }, []);

  const onSubmit = async (post: Post): Promise<void> => {
    try {
      const { data } = (await API.graphql(
        graphqlOperation(updatePost, {
          input: {
            id,
            ...post,
          },
        }),
      )) as GraphQLResult<{ updatePost: Post }>;
      dispatch(postsSlice.actions.editPost({ id, updates: post }));
      console.log(data);

      openSnackbar({
        severity: "success",
        message: "Post successfully updated.",
      });
    } catch (err) {
      console.error(err);
      openSnackbar({
        message: "Unable to update post. Please try again.",
        severity: "error",
      });
    }
    history.push("/dashboard");
  };

  if (!uid) {
    openSnackbar({ severity: "error", message: "Please login to create a post." });
    return <Redirect to="/" />;
  }
  return (
    <>
      <Header />
      <div className="page-header">
        <Container>
          <Typography variant="h5" className="app__title">
            Edit Post
          </Typography>
        </Container>
      </div>
      <Container>
        <BlogPostForm post={post} onSubmit={onSubmit} />
      </Container>
    </>
  );
};

export default EditPostPage;
