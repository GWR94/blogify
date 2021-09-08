import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Chip,
  Dialog,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { MoreVertRounded } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { AppState, GraphQLResult } from "../../store/store";
import { Post } from "../../store/posts.i";
import { getUser } from "../../graphql/queries";
import { S3Image } from "../auth/Profile";
import UserImageLinked from "../common/UserImageLinked";
import { breakpoints } from "../../utils";
import DeleteDialog from "../common/DeleteDialog";
import placeholder from "../auth/img/placeholder.png";

const BlogPostListItem = ({
  id,
  tags,
  createdAt,
  author,
  title,
  overview,
  email,
  userID,
}: Post): JSX.Element => {
  const { uid } = useSelector(({ auth }: AppState) => auth);
  const history = useHistory();
  const [image, setImage] = useState<S3Image>();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const anchorRef = React.useRef(null);
  const mobile = useMediaQuery(breakpoints.only("xs"));

  console.log(userID);

  useEffect(() => {
    const getUserData = async (): Promise<void> => {
      const { data } = (await API.graphql({
        query: getUser,
        variables: { id: userID },
        authMode: "AWS_IAM",
      })) as GraphQLResult<{ getUser: { profileImage: S3Image } }>;
      if (data) {
        setImage(data?.getUser?.profileImage);
      }
    };
    getUserData();
  }, []);

  const handleDeletePost = async () => {
    console.log("TODO");
  };

  return (
    <>
      <Paper
        elevation={2}
        className="list__container"
        tabIndex={0}
        role="button"
        onClick={(e): void => {
          if (e.target === e.currentTarget) {
            history.push(`/read/${id}`);
          }
        }}
      >
        <div className="list__header">
          {!mobile && (
            <UserImageLinked userID={userID as string} size={mobile ? 40 : 60} />
          )}
          <div
            style={{
              marginRight: uid ? 20 : 0,
            }}
          >
            <Typography className="list__title">{title}</Typography>
            <Typography className="list__overview">{overview}</Typography>
          </div>
        </div>

        {uid === userID && (
          <div className="list__edit">
            <IconButton onClick={(): void => setMenuOpen(true)}>
              <MoreVertRounded ref={anchorRef} />
            </IconButton>
            <Menu
              open={menuOpen}
              onClose={(): void => setMenuOpen(false)}
              anchorEl={anchorRef.current}
              transformOrigin={{
                vertical: -40,
                horizontal: "right",
              }}
            >
              <MenuItem onClick={(): void => history.push(`/edit/${id}`)}>
                Edit Post
              </MenuItem>
              <MenuItem
                onClick={(): void => {
                  setDeleteOpen(true);
                  setMenuOpen(false);
                }}
              >
                Delete Post
              </MenuItem>
            </Menu>
          </div>
        )}

        <div
          className="list__authorContainer"
          tabIndex={0}
          role="button"
          onClick={(e): void => {
            e.stopPropagation();
            history.push(`/read/${id}`);
          }}
        >
          <div className="list-item__tags">
            {tags.map((tag: string) => (
              <Chip
                key={tag}
                label={tag}
                size={mobile ? "small" : "medium"}
                className="list__tag"
              />
            ))}
          </div>
          <div className="list__author">
            {image && mobile && (
              <UserImageLinked userID={userID as string} size={mobile ? 40 : 60} />
            )}
            <div>
              <Typography>
                Written by <em>{author}</em>
              </Typography>
              <Typography>
                on <span> {moment(createdAt).format("DD MMMM, YYYY")}</span>
              </Typography>
              {email && <Typography> -{email}</Typography>}
            </div>
          </div>
        </div>
      </Paper>
      <DeleteDialog
        isOpen={deleteOpen}
        onClose={(): void => setDeleteOpen(false)}
        title="Delete Post?"
        text={[
          "Are you sure you want to delete this post?",
          "This action cannot be undone.",
        ]}
        confirmFunc={handleDeletePost}
        denyFunc={(): void => setDeleteOpen(false)}
      />
    </>
  );
};

export default BlogPostListItem;
