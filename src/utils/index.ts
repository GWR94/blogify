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

export const breakpoints = createBreakpoints({});
