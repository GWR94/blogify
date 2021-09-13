import { AmplifyS3Image } from "@aws-amplify/ui-react";
import { CircularProgress } from "@material-ui/core";
import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { getUser } from "../../graphql/queries";
import { Post } from "../../store/posts.i";
import { GraphQLResult } from "../../store/store";
import { User } from "../auth/Profile";
import ProfileDialog from "./ProfileDialog";
import placeholder from "../auth/img/placeholder.png";

interface UserImageLinkedProps {
  userID: string;
  size: number;
}

const UserImageLinked = ({ userID, size }: UserImageLinkedProps): JSX.Element => {
  const [isLoading, setLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getUserData = async (): Promise<void> => {
      try {
        const { data } = (await API.graphql({
          query: getUser,
          variables: { id: userID },
          // @ts-expect-error - no
          authMode: "AWS_IAM",
        })) as GraphQLResult<{ getUser: User }>;
        const {
          id,
          username,
          email,
          name,
          followers,
          following,
          savedPosts,
          profileImage,
          posts,
        }: User = data?.getUser as User;
        setUser({
          id,
          username,
          email,
          name,
          followers,
          following,
          savedPosts,
          profileImage,
        });
        setPosts(posts?.items as Post[]);
        if (!profileImage) setImgLoading(false);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    getUserData();
  }, []);

  return isLoading ? (
    <CircularProgress size={20} />
  ) : (
    <>
      <div
        className="profile__image"
        role="button"
        tabIndex={0}
        style={{ height: size, width: size, marginRight: 20 }}
        onClick={(e): void => {
          setOpen(true);
          return e.stopPropagation();
        }}
      >
        {imgLoading && (
          <div className="profile__spinner">
            <CircularProgress size={20} />
          </div>
        )}
        {user?.profileImage ? (
          <AmplifyS3Image
            imgKey={user?.profileImage?.key}
            handleOnLoad={(): void => {
              setImgLoading(false);
            }}
            hidden={imgLoading}
          />
        ) : (
          <img
            src={placeholder}
            alt="Display Image"
            style={{ height: "100%", width: "100%" }}
          />
        )}
      </div>
      {isOpen && (
        <ProfileDialog
          isOpen={isOpen}
          setOpen={(open): void => {
            setOpen(open);
          }}
          user={user as User}
          posts={posts}
        />
      )}
    </>
  );
};

export default UserImageLinked;
