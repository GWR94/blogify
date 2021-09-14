import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { API } from "aws-amplify";
import { CircularProgress, Typography } from "@material-ui/core";
import { Post } from "../../API";
import Header from "../common/Header";
import ReadQuillEditor from "../common/ReadQuillEditor";
import CommentList from "../common/CommentList";
import * as actions from "../../actions/posts.action";
import { Comment } from "../../store/posts.i";
import { getPost } from "../../graphql/queries";
import { GraphQLResult } from "../../store/store";
import Loading from "../common/Loading";

interface ReadPostProps {
  id: string;
}

const ReadPost = ({ id }: ReadPostProps): JSX.Element => {
  const dispatch = useDispatch();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const getPostData = async (): Promise<void> => {
      const { data } = (await API.graphql({
        query: getPost,
        variables: { id },
        // @ts-expect-error - don't have enum for authMode
        authMode: "AWS_IAM",
      })) as GraphQLResult<{
        getPost: Post;
      }>;
      setPost(data?.getPost);
      dispatch(actions.setComments((data?.getPost?.comments?.items as Comment[]) ?? []));
    };
    getPostData();
  }, []);

  return !post ? (
    <Loading />
  ) : (
    <>
      <Header />
      <div className="content-container">
        <Typography variant="h4" className="app__title" style={{ marginTop: 10 }}>
          {post.title}
        </Typography>
        <Typography variant="h6" className="app__subtitle">
          {post.overview}
        </Typography>
        <ReadQuillEditor passedBody={post.body} />
        <Typography variant="subtitle1">- created by {post.author}</Typography>
        <Typography variant="subtitle1">
          on {moment(post.createdAt).format("Do MMMM YYYY")}
        </Typography>
        <CommentList postID={post.id} userID={post.userID as string} />
      </div>
    </>
  );
};

export default ReadPost;
