import { AmplifyS3Image } from "@aws-amplify/ui-react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { API, graphqlOperation } from "aws-amplify";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../graphql/mutations";
import { getUser } from "../../graphql/queries";
import { Post } from "../../store/posts.i";
import { AppState, GraphQLResult } from "../../store/store";
import { breakpoints } from "../../utils";
import LoginModal from "../auth/LoginModal";
import { User } from "../auth/Profile";
import placeholder from "../auth/img/placeholder.png";
import * as actions from "../../actions/auth.action";
import { openSnackbar } from "../../utils/components/Notifier";

interface ProfileDialogProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  user: User;
  posts: Post[];
}

const ProfileDialog = ({
  isOpen,
  setOpen,
  user: followingUser,
  posts,
}: ProfileDialogProps): JSX.Element => {
  const [isLoading, setLoading] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(followingUser);

  const dispatch = useDispatch();
  const { uid } = useSelector(({ auth }: AppState) => auth);
  const isFollowing = user?.followers.includes(uid as string);

  const getUserData = async (): Promise<User> => {
    const { data } = (await API.graphql(
      graphqlOperation(getUser, {
        id: uid,
      }),
    )) as GraphQLResult<{ getUser: User }>;
    return data?.getUser as User;
  };

  const mobile = breakpoints.only("xs");

  const handleUnfollow = async (): Promise<void> => {
    setLoading(true);

    const authUser = await getUserData();

    const updatedAuthUser = {
      id: authUser.id,
      following: authUser.following.filter((follow) => follow !== user.id),
    };

    try {
      // remove other users id from current users following array
      await API.graphql(
        graphqlOperation(updateUser, {
          input: updatedAuthUser,
        }),
      );
    } catch (err) {
      console.error(err);
    }

    try {
      const data = await API.post("api", "/api/handle-unfollow", {
        body: {
          authUserID: uid,
          followingUser,
        },
      });
      console.log(data);

      setUser({
        ...user,
        followers: user.followers.filter((follow) => follow !== uid),
      } as User);
    } catch (err) {
      console.error(err);
    }

    dispatch(
      actions.updateUser({
        following: authUser.following.filter((follow) => follow !== user.id),
      }),
    );
    openSnackbar({
      severity: "success",
      message: "User successfully unfollowed.",
    });
    setLoading(false);
  };

  const handleFollow = async (): Promise<void> => {
    setLoading(true);

    const authUser = await getUserData();

    const updatedAuthUser = {
      id: authUser.id,
      following: [...authUser.following, user.id],
    };

    try {
      await API.graphql(
        graphqlOperation(updateUser, {
          input: updatedAuthUser,
        }),
      );
    } catch (err) {
      console.error(err);
    }

    try {
      const data = await API.post("api", "/api/handle-follow", {
        body: {
          authUserID: uid,
          followingUser,
        },
      });
      console.log(data);
      setUser({
        ...user,
        followers: [...user?.followers, uid as string],
      });
    } catch (err) {
      console.error(err);
    }

    dispatch(
      actions.updateUser({
        following: [...authUser?.following, user.id as string],
      }),
    );

    openSnackbar({
      severity: "success",
      message: "User successfully followed.",
    });

    setLoading(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={(): void => setOpen(false)}>
        <DialogTitle>{user.name}</DialogTitle>
        <DialogContent className="user__imageContainer">
          <div className="user__image">
            {user?.profileImage?.key ? (
              <AmplifyS3Image imgKey={user?.profileImage?.key} />
            ) : (
              <img
                src={placeholder}
                alt="Display Image"
                style={{ height: "100%", width: "100%" }}
              />
            )}
          </div>
          <div className="profile__count">
            <Typography>Following: {user.following.length}</Typography>
            <Typography>Followers: {user.followers.length}</Typography>
            <Typography>Posts: {posts.length}</Typography>
          </div>
        </DialogContent>
        {uid !== user.id && (
          <DialogActions>
            {uid ? (
              <Button
                onClick={isFollowing ? handleUnfollow : handleFollow}
                variant={isFollowing ? "outlined" : "text"}
                size={mobile ? "small" : "medium"}
                color="primary"
              >
                {isLoading ? (
                  <CircularProgress size={20} />
                ) : isFollowing ? (
                  "Following"
                ) : (
                  "Follow"
                )}
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={(): void => {
                  setOpen(false);
                  setLoginOpen(true);
                }}
              >
                Login to Follow
              </Button>
            )}
          </DialogActions>
        )}
      </Dialog>
      <LoginModal open={loginOpen} onClose={(): void => setLoginOpen(false)} />
    </>
  );
};

export default ProfileDialog;
