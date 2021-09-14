import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import BlogPostSummary from "./BlogPostSummary";
import BlogPostList from "./BlogPostList";
import Header from "../common/Header";
import SearchSummary from "./SearchSummary";
import { AppState, GraphQLResult } from "../../store/store";
import { getUser, listPosts } from "../../graphql/queries";
import * as actions from "../../actions/posts.action";
import { Post } from "../../store/posts.i";
import { User } from "../auth/Profile";

const BlogDashboardPage: React.FC = (): JSX.Element => {
  const { uid } = useSelector(({ auth }: AppState) => auth);
  const [viewPosts, setViewPosts] = useState<"all" | "personal">("personal");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get("view");
    if (view) setViewPosts(view as "all" | "personal");
    else if (!uid) setViewPosts("all");
  }, []);

  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const handleGetPosts = async (): Promise<void> => {
      let following: string[] = [];
      if (uid) {
        const { data } = (await API.graphql({
          query: getUser,
          variables: { id: uid, limit: 5 },
          // @ts-expect-error - no authMode enum
          authMode: "AWS_IAM",
        })) as GraphQLResult<{ getUser: User }>;
        following = data?.getUser?.following ?? [];
      }

      const feed = [uid, ...(following as string[])];
      if (viewPosts === "all") {
        try {
          const { data } = (await API.graphql({
            query: listPosts,
            variables: {
              filter: {
                public: {
                  eq: true,
                },
              },
              limit: 10,
            },
            // @ts-expect-error - no authMode enum
            authMode: "AWS_IAM",
          })) as GraphQLResult<{ listPosts: { items: Post[]; nextToken: string } }>;
          if (data?.listPosts) {
            dispatch(
              actions.setPublicPosts(data.listPosts.items, data.listPosts.nextToken),
            );
          }
        } catch (err) {
          console.error(err);
        }
      } else if (viewPosts === "personal") {
        const { data } = (await API.graphql({
          query: listPosts,
          variables: {
            filter: {
              or: feed.map((user: string | null) => ({
                userID: {
                  eq: user,
                },
              })),
            },
            limit: 10,
          },
        })) as GraphQLResult<{ listPosts: { items: Post[]; nextToken: string | null } }>;

        if (data?.listPosts) {
          dispatch(actions.setPosts(data.listPosts.items, data.listPosts.nextToken));
        }
      }
      setLoading(false);
    };

    handleGetPosts();
  }, [viewPosts]);

  return (
    <div>
      <Header />
      {uid ? (
        <BlogPostSummary
          setViewPosts={(view: "all" | "personal"): void => setViewPosts(view)}
          viewPosts={viewPosts}
        />
      ) : (
        <SearchSummary />
      )}
      {/* <BlogPostListFilters /> */}
      <BlogPostList
        isLoading={isLoading}
        setViewPosts={(view: "all" | "personal"): void => setViewPosts(view)}
      />
    </div>
  );
};

export default BlogDashboardPage;
