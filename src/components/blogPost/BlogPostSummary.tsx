import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, useMediaQuery } from "@material-ui/core";
import { AmplifyS3Image } from "@aws-amplify/ui-react";
import { useSelector } from "react-redux";
import Button from "../../utils/components/MuiButton";
import { AppState } from "../../store/store";
import { breakpoints, getUserData } from "../../utils";
import { User } from "../auth/Profile";
import { AddCircle, CommentSharp, CreateOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import placeholder from "../auth/img/placeholder.png";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../../graphql/queries";

interface BlogPostSummaryProps {
  viewPosts: "all" | "personal";
  setViewPosts: (view: "all" | "personal") => void;
}

const BlogPostSummary = ({
  viewPosts,
  setViewPosts,
}: BlogPostSummaryProps): JSX.Element => {
  const history = useHistory();
  const { uid, name, following, followers } = useSelector(({ auth }: AppState) => auth);
  const mobile = useMediaQuery(breakpoints.only("xs"));

  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect((): void => {
    const getUserData = async (): Promise<void> => {
      const { data } = await API.graphql(
        graphqlOperation(getUser, {
          id: uid,
        }),
      );
      console.log(data.getUser);
      setUser(data.getUser);
      setLoading(false);
    };
    getUserData();
  }, []);

  return isLoading ? (
    <CircularProgress size={20} />
  ) : (
    <div className="header__container">
      <div className="header__profile">
        {user?.profileImage?.key ? (
          <div className="user__image">
            <AmplifyS3Image imgKey={user?.profileImage?.key} />
          </div>
        ) : (
          <img src={placeholder} alt="Profile Image" className="user__image" />
        )}
        <Typography className="profile__name">{user?.name ?? name}</Typography>
        <div className="profile__count">
          <Typography>
            Following: <span className="profile__num">{following?.length ?? 0}</span>
          </Typography>
          <Typography>
            Followers: <span className="profile__num">{followers?.length ?? 0}</span>
          </Typography>
          <Typography>
            Posts: <span className="profile__num">{user?.posts?.items?.length ?? 0}</span>
          </Typography>
        </div>
      </div>

      <div className="header__buttonContainer">
        <Button
          color="primary"
          onClick={(): void => history.push("/create")}
          variant="contained"
          startIcon={<CreateOutlined />}
          size={mobile ? "small" : "medium"}
          style={{ marginBottom: 20 }}
        >
          Create Post
        </Button>
      </div>

      <div className="header__buttonContainer">
        <Button
          color="info"
          onClick={(): void => setViewPosts("personal")}
          size={mobile ? "small" : "medium"}
          variant={viewPosts === "personal" ? "contained" : "outlined"}
          style={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          View My Feed
        </Button>
        <Button
          color="info"
          size={mobile ? "small" : "medium"}
          onClick={(): void => setViewPosts("all")}
          variant={viewPosts === "all" ? "contained" : "outlined"}
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          View Public Posts
        </Button>
      </div>
    </div>
  );
};

export default BlogPostSummary;
