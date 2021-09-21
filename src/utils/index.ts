import { API, graphqlOperation } from "aws-amplify";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import { getPost, getUser } from "../graphql/queries";
import { Post, User } from "../API";
import { GraphQLResult } from "../store/store";

export const getUserData = async (id: string): Promise<User> => {
  const { data } = (await API.graphql({
    query: getUser,
    variables: {
      id,
    },
    // @ts-expect-error - no enum for authMode
    authMode: "AWS_IAM",
  })) as GraphQLResult<{ getUser: User }>;
  return (data?.getUser as User) ?? null;
};

export const doesUserExist = async (id: string): Promise<boolean> => {
  const { data } = (await API.graphql({
    query: getUser,
    variables: {
      id,
    },
    // @ts-expect-error - no enum for authMode
    authMode: "AWS_IAM",
  })) as GraphQLResult<{ getUser: User }>;
  return data?.getUser !== undefined;
};

export const getPostData = async (id: string): Promise<Post> => {
  const { data } = (await API.graphql(
    graphqlOperation(getPost, {
      id,
    }),
  )) as GraphQLResult<{ getPost: Post }>;
  return data?.getPost as Post;
};

// amplify
// helper methods for setting up aws_exports with localhost and production simultaneously
export const hasLocalhost = (hostname: string): boolean =>
  Boolean(
    hostname.match(/localhost/) ||
      hostname.match(/127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/),
  );

export const hasHostname = (hostname: string): boolean =>
  Boolean(hostname.includes(window.location.hostname));

export const isLocalhost = hasLocalhost(window.location.hostname);

export const breakpoints = createBreakpoints({});

export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
