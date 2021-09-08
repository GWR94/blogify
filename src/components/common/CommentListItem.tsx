import { Badge, IconButton, Paper, Tooltip, Typography } from "@material-ui/core";
import {
  DeleteRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
} from "@material-ui/icons";
import { API, graphqlOperation } from "aws-amplify";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../graphql/mutations";
import { AppState } from "../../store/store";
import { openSnackbar } from "../../utils/components/Notifier";
import UserImageLinked from "./UserImageLinked";
import * as actions from "../../actions/posts.action";
import { Comment } from "../../store/posts.i";
import DeleteDialog from "./DeleteDialog";

interface CommentProps {
  comment: Comment;
}

const CommentListItem = ({ comment }: CommentProps): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { uid } = useSelector(({ auth }: AppState) => auth);
  const dispatch = useDispatch();

  const isLiked = comment?.likes?.includes(uid as string) ?? false;

  const handleDeleteComment = async (): Promise<void> => {
    try {
      await API.graphql(
        graphqlOperation(deleteComment, {
          input: {
            id: comment.id,
          },
        }),
      );
      dispatch(actions.deleteComment(comment.id));
    } catch (err) {
      openSnackbar({
        message: "Unable to remove comment. Please try again.",
        severity: "error",
      });
      console.error(err);
    }
    setOpen(false);
  };

  const handleFavourite = async (): Promise<void> => {
    if (!uid) {
      openSnackbar({
        severity: "error",
        message: "Please login to 'Like' comments.",
      });
      return;
    }
    let updatedComment;
    if (isLiked) {
      updatedComment = {
        ...comment,
        likes: comment.likes.filter((user: string) => user !== uid) as string[],
      };
      await API.graphql(
        graphqlOperation(updateComment, {
          input: updatedComment,
        }),
      );
    } else {
      updatedComment = {
        ...comment,
        likes: [...comment.likes, uid] as string[],
      };
      await API.graphql(
        graphqlOperation(updateComment, {
          input: updatedComment,
        }),
      );
    }
    dispatch(actions.updateComment(comment.id, updatedComment));
  };

  return (
    <>
      <Paper className="comment__item--container" style={{ marginBottom: 12 }}>
        <div className="comment__item">
          <div className="comment__image">
            <UserImageLinked userID={comment.userID as string} size={50} />
          </div>
          <Typography className="comment__content">{comment.content}</Typography>

          <div className="comment__actions">
            <IconButton
              onClick={handleFavourite}
              // don't allow the user to like their own comment
              disabled={comment.userID === uid}
            >
              <Badge badgeContent={comment.likes.length} variant="standard">
                {isLiked ? (
                  <FavoriteRounded style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderRounded />
                )}
              </Badge>
            </IconButton>
            {/* 
              If comments userID is the same as user, allow them to be able to #
              delete it as its their own comment
            */}
            {uid === comment.userID && (
              <IconButton onClick={(): void => setOpen(true)}>
                <DeleteRounded />
              </IconButton>
            )}
          </div>
        </div>
      </Paper>
      <DeleteDialog
        isOpen={isOpen}
        onClose={(): void => setOpen(false)}
        title="Delete Comment?"
        text={[
          "Are you sure you want to delete this comment?",
          "This action cannot be undone",
        ]}
        confirmFunc={handleDeleteComment}
        denyFunc={(): void => setOpen(false)}
      />
    </>
  );
};

export default CommentListItem;
