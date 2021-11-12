import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Comment } from "../../store/posts.i";
import { AppState } from "../../store/store";
import LoginModal from "../auth/LoginModal";
import CommentBox from "./CommentBox";
import CommentListItem from "./CommentListItem";

interface CommentListProps {
  postID: string;
  userID: string;
}

const CommentList = ({ postID, userID }: CommentListProps): JSX.Element => {
  const { comments } = useSelector(({ posts }: AppState) => posts);
  const { uid } = useSelector(({ auth }: AppState) => auth);
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="comment__container">
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        {comments.length > 0 ? (
          comments?.map((comment: Comment) => (
            <CommentListItem key={comment.id} comment={comment} />
          ))
        ) : (
          <Typography>Be the first to comment below.</Typography>
        )}
        <CommentBox postID={postID} disabled={uid === null} />
        {!uid && (
          <Typography>
            Please login{" "}
            <span role="button" tabIndex={0} onClick={(): void => setOpen(true)}>
              here
            </span>{" "}
            to add a comment
          </Typography>
        )}
      </div>
      <LoginModal open={isOpen} onClose={(): void => setOpen(false)} />
    </>
  );
};

export default CommentList;
