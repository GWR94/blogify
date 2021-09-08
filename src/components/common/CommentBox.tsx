import { TextField } from "@material-ui/core";
import { API, graphqlOperation } from "aws-amplify";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../graphql/mutations";
import { AppState, GraphQLResult } from "../../store/store";
import Button from "../../utils/components/MuiButton";
import { Comment } from "../../store/posts.i";
import * as actions from "../../actions/posts.action";

interface CommentBoxProps {
  postID: string;
  userID: string;
}

const CommentBox = ({ postID }: CommentBoxProps): JSX.Element => {
  const [content, setContent] = useState("");
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
        actions.addComment({
          id: comment.id,
          content: comment.content,
          likes: comment.likes,
          postID: comment.postID,
          userID: comment.userID,
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
        minRows={3}
        fullWidth
        value={content}
        onChange={(e): void => setContent(e.target.value)}
        variant="outlined"
      />
      <div className="commentBox__actions">
        <Button
          color="success"
          size="small"
          onClick={handleAddComment}
          style={{ marginTop: 4 }}
        >
          Add Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentBox;
