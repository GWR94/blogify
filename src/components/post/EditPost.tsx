import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { useHistory } from "react-router-dom";
import BlogPostForm from "../common/BlogPostForm";
import * as actions from "../../actions/posts.action";
import { AppState } from "../../store/store";
import { Post } from "../../store/posts.i";
import Header from "../common/Header";
import { updatePost } from "../../graphql/mutations";
import { openSnackbar } from "../../utils/components/Notifier";
import { Container } from "@material-ui/core";

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
      const { data } = await API.graphql(
        graphqlOperation(updatePost, {
          input: {
            id,
            ...post,
          },
        }),
      );
      dispatch(actions.editPost(id, post));
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

  return (
    <>
      <Header />
      <div className="page-header">
        <Container>
          <h1 className="page-header__title">Edit Post</h1>
        </Container>
      </div>
      <Container>
        <BlogPostForm post={post} onSubmit={onSubmit} />
      </Container>
    </>
  );
};

export default EditPostPage;
