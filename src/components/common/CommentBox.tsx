import { TextField, Typography } from "@material-ui/core";
import { API, graphqlOperation } from "aws-amplify";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../graphql/mutations";
import { AppState, GraphQLResult } from "../../store/store";
import Button from "../../utils/components/MuiButton";
import { Comment } from "../../store/posts.i";
import { postsSlice } from "../../slices/post.slice";

interface CommentBoxProps {
  postID: string;
  disabled: boolean;
}

const CommentBox = ({ postID, disabled }: CommentBoxProps): JSX.Element => {
  const [content, setContent] = useState("");
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { uid } = useSelector(({ auth }: AppState) => auth);

  const handleAddComment = async (): Promise<void> => {
    try {
      const { data } = (await API.graphql(
        graphqlOperation(createComment, {
          input: {
            content,
            postID,
            userID: uid,
            likes: [],
          },
        }),
      )) as GraphQLResult<{ createComment: Comment }>;
      const comment = data?.createComment as Comment;
      dispatch(
        postsSlice.actions.addComment({
          comment: {
            id: comment.id,
            content: comment.content,
            likes: comment.likes,
            postID: comment.postID,
            userID: comment.userID,
          },
        }),
      );
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="commentBox__container" style={{ marginTop: 10 }}>
      <TextField
        multiline
        maxRows={5}
        disabled={disabled}
        minRows={3}
        fullWidth
        value={content}
        onChange={(e): void => setContent(e.target.value)}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        variant="outlined"
      />
      <div
        className="commentBox__actions"
        style={{ justifyContent: uid ? "flex-end" : "space-between" }}
      >
        {!uid && (
          <Typography>
            Please login{" "}
            <span
              role="button"
              tabIndex={0}
              onClick={(): void => setOpen(true)}
              style={{ cursor: "pointer" }}
            >
              here
            </span>{" "}
            to add a comment
          </Typography>
        )}
        <Button
          color="success"
          size="small"
          className="commentBox__button"
          disabled={disabled}
          onClick={handleAddComment}
          style={{ cursor: "not-allowed !important", marginTop: 4 }}
        >
          Add Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentBox;
