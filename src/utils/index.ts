import { API, graphqlOperation } from "aws-amplify";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import { getPost, getUser } from "../graphql/queries";
import { Post, User } from "../API";
import { GraphQLResult } from "../store/store";

export const getUserData = async (id: string): Promise<User> => {
  const { data } = (await API.graphql(
    graphqlOperation(getUser, {
      id,
    }),
  )) as GraphQLResult<{ getUser: User }>;
  return data?.getUser as User;
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
