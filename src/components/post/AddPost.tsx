import React from "react";
import { useDispatch } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { useHistory } from "react-router-dom";
import BlogPostForm from "../common/BlogPostForm";
import * as actions from "../../actions/posts.action";
import Header from "../common/Header";
import { createPost } from "../../graphql/mutations";
import { Post } from "../../store/posts.i";
import { Container } from "@material-ui/core";

const AddPostPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = async (post: Post): Promise<void> => {
    console.log(post);
    const { data } = await API.graphql(
      graphqlOperation(createPost, {
        input: post,
      }),
    );
    dispatch(actions.addPost(data.createPost));
    history.push("/dashboard");
  };

  return (
    <>
      <Header />
      <div className="page-header">
        <Container>
          <h1 className="page-header__title">Add Post</h1>
        </Container>
      </div>
      <Container>
        <BlogPostForm onSubmit={onSubmit} />
      </Container>
    </>
  );
};

export default AddPostPage;
