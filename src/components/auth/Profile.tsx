import {
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AmplifyS3Image } from "@aws-amplify/ui-react";
import { Redirect } from "react-router-dom";
import Header from "../common/Header";
import { getUser } from "../../graphql/queries";
import { AppState, GraphQLResult } from "../../store/store";
import MuiButton from "../../utils/components/MuiButton";
import { updateUser } from "../../graphql/mutations";
import awsExports from "../../aws-exports";
import { Post, S3Image } from "../../store/posts.i";
import { openSnackbar } from "../../utils/components/Notifier";
import { breakpoints } from "../../utils";
import BlogPostList from "../blogPost/BlogPostList";
import { postsSlice } from "../../slices/post.slice";
import { User } from "../../store/auth.i";

interface UpdateProfileInput {
  name: string;
  email?: string;
}

const Profile = (): JSX.Element => {
  const { uid } = useSelector(({ auth }: AppState) => auth);
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    name: "",
    following: [],
    followers: [],
    savedPosts: [],
    profileImage: null,
  });
  const [isEditing, setEditing] = useState(false);
  const [image, setImage] = useState<S3Image>();

  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const handleGetUser = async (): Promise<void> => {
      const { data } = (await API.graphql(
        graphqlOperation(getUser, {
          id: uid,
        }),
      )) as GraphQLResult<{ getUser: User }>;
      const {
        username,
        email,
        name,
        following,
        posts,
        followers,
        savedPosts,
        profileImage,
      } = data?.getUser as User;
      setUser({
        username,
        email,
        name,
        following,
        followers,
        savedPosts,
        profileImage,
      });
      if (posts) setUserPosts(posts.items);
      if (profileImage) setImage(profileImage);
      dispatch(
        postsSlice.actions.setPosts({ posts: posts?.items as Post[], nextToken: null }),
      );
      setLoading(false);
    };

    handleGetUser();
  }, []);

  const handleUpdateProfile = async (): Promise<void> => {
    const { email, name } = user;
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      const input: UpdateProfileInput = {
        name,
      };
      if (email) input.email = email;
      const res = await Auth.updateUserAttributes(authUser, input);
      if (res === "SUCCESS") {
        await API.graphql(
          graphqlOperation(updateUser, {
            input: {
              id: uid,
              ...user,
              profileImage: image,
            },
          }),
        );
        openSnackbar({
          severity: "success",
          message: "Profile successfully updated.",
        });
      }
      setEditing(false);
    } catch (err) {
      openSnackbar({
        severity: "error",
        message: "Unable to update profile. Please try again.",
      });
      console.error(err);
    }
  };

  const uploadToS3 = async (file: File): Promise<void> => {
    try {
      const { key } = (await Storage.put(`${uid}/${file.name}`, file, {
        contentType: file.type,
      })) as { key: string };

      const profileImage = {
        key,
        bucket: awsExports.aws_user_files_s3_bucket,
        region: awsExports.aws_user_files_s3_bucket_region,
      };

      const updatedUser = {
        id: uid,
        ...user,
        profileImage,
      };

      await API.graphql(
        graphqlOperation(updateUser, {
          input: updatedUser,
        }),
      );
      window.location.reload();
    } catch (err) {
      openSnackbar({
        severity: "error",
        message: "Unable to upload image. Please try again.",
      });
      console.error(err);
    }
  };
  const mobile = useMediaQuery(breakpoints.down("sm"));

  const { username, email, name, following, followers, profileImage } = user;
  return !uid ? (
    <Redirect to="/dashboard" />
  ) : (
    <>
      <Header />
      <Container>
        {isLoading ? (
          <div className="profile__loadingContainer">
            <CircularProgress size={60} />
          </div>
        ) : (
          <>
            <Typography
              variant="h4"
              gutterBottom
              className="app__title"
              style={{ textAlign: "center", marginTop: 10, fontWeight: "bold" }}
            >
              Profile
            </Typography>
            <Typography variant="subtitle1" gutterBottom style={{ textAlign: "center" }}>
              To make changes to your profile, click the &quot;Edit Profile&quot; button,
              and make your changes.
            </Typography>
            <Grid container spacing={2} style={{ marginTop: 20 }}>
              <Grid item xs={12}>
                <div className="profile__image--container">
                  <div className="profile__image">
                    <AmplifyS3Image imgKey={image?.key} />
                  </div>
                  {isEditing && (
                    <>
                      <MuiButton
                        variant="outlined"
                        color="primary"
                        size="small"
                        style={{ marginTop: 10 }}
                        onClick={(): void =>
                          document.getElementById("fileInput")?.click()
                        }
                      >
                        {profileImage ? "Change Image" : "Upload Image"}
                      </MuiButton>
                      <input
                        hidden
                        id="fileInput"
                        type="file"
                        onChange={(e): void => {
                          if (e.target.files) {
                            uploadToS3(e.target.files[0]);
                          }
                        }}
                      />
                    </>
                  )}
                  <div className="profile__count">
                    <Typography>
                      Following:{" "}
                      <span className="profile__num">{following?.length ?? 0}</span>
                    </Typography>
                    <Typography>
                      Followers:{" "}
                      <span className="profile__num">{followers?.length ?? 0}</span>
                    </Typography>
                    <Typography>
                      Posts: <span className="profile__num">{userPosts.length ?? 0}</span>
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={username}
                  variant="outlined"
                  disabled
                  fullWidth
                  size={mobile ? "small" : "medium"}
                  label="Username"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={name}
                  variant="outlined"
                  disabled={!isEditing}
                  size={mobile ? "small" : "medium"}
                  fullWidth
                  label="Display Name (optional)"
                  onChange={(e): void => setUser({ ...user, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(e): void => setUser({ ...user, email: e.target.value })}
                  label="Email Address"
                  disabled={!isEditing}
                  size={mobile ? "small" : "medium"}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <div className="profile__buttonContainer">
              {!isEditing ? (
                <MuiButton
                  variant="contained"
                  color="primary"
                  onClick={(): void => setEditing(true)}
                >
                  Edit Profile
                </MuiButton>
              ) : (
                <>
                  <MuiButton
                    variant="outlined"
                    color="error"
                    onClick={(): void => setEditing(false)}
                    style={{ margin: "0 8px" }}
                  >
                    Cancel
                  </MuiButton>
                  <MuiButton
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateProfile}
                  >
                    Update Profile
                  </MuiButton>
                </>
              )}
            </div>
          </>
        )}
        <BlogPostList profile />
      </Container>
    </>
  );
};

export default Profile;
