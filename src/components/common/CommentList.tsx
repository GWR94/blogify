import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Comment } from "../../store/posts.i";
import { AppState } from "../../store/store";
import CommentBox from "./CommentBox";
import CommentListItem from "./CommentListItem";

interface CommentListProps {
  postID: string;
  userID: string;
}

const CommentList = ({ postID, userID }: CommentListProps): JSX.Element => {
  const { comments } = useSelector(({ posts }: AppState) => posts);
  const { uid } = useSelector(({ auth }: AppState) => auth);

  return (
    <div className="comment__container">
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      {comments?.map((comment: Comment) => (
        <CommentListItem key={comment.id} comment={comment} />
      ))}
      {uid && <CommentBox postID={postID} userID={userID} />}
    </div>
  );
};

export default CommentList;
