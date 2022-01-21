import React, { BlockquoteHTMLAttributes } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CircularProgress,
  Container,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import BlogPostListItem from "./BlogPostListItem";
import { AppState, GraphQLResult } from "../../store/store";
import Button from "../../utils/components/MuiButton";
import { breakpoints } from "../../utils";
import { listPosts } from "../../graphql/queries";
import { Post } from "../../store/posts.i";
import { postsSlice } from "../../slices/post.slice";

interface BlogPostListProps {
  isLoading?: boolean;
  setViewPosts?: (view: "all" | "personal") => void;
  profile?: boolean;
}

const BlogPostList = ({
  isLoading,
  setViewPosts,
  profile = false,
}: BlogPostListProps): JSX.Element => {
  // retrieve posts and nextToken from store
  const { posts, nextToken } = useSelector(({ posts }: AppState) => posts);
  const history = useHistory();
  const dispatch = useDispatch();

  // set boolean to check if user is on a mobile/small screen
  const mobile = useMediaQuery(breakpoints.only("xs"));

  const handleLoadNextPosts = async (): Promise<void> => {
    if (!nextToken) return;
    const { data } = (await API.graphql({
      query: listPosts,
      variables: { nextToken },
      authMode: "AWS_IAM",
    })) as GraphQLResult<{ listPosts: { items: Post[]; nextToken: string | null } }>;
    if (data?.listPosts.items) {
      dispatch(
        postsSlice.actions.loadMorePosts({
          posts: data.listPosts.items,
          nextToken: data.listPosts.nextToken,
        }),
      );
    }
  };

  return (
    <Container>
      {isLoading ? (
        <div className="list__loadingContainer">
          <CircularProgress size={50} className="list__loader" />
        </div>
      ) : posts.length === 0 && !profile ? (
        <Paper elevation={4} className="list__noDataContainer">
          <Typography variant="h5" gutterBottom>
            No Posts
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            To have posts show up in your feed, create a post or two - or begin following
            users&apos; to have theirs show up on your feed!
          </Typography>
          <div>
            <Button
              color="primary"
              onClick={(): void => history.push("/create")}
              variant="outlined"
              style={{ margin: "10px 4px" }}
              size={mobile ? "small" : "medium"}
            >
              Create Post
            </Button>
            <Button
              color="primary"
              onClick={(): void =>
                setViewPosts ? setViewPosts("all") : history.push("/dashboard?view=all")
              }
              variant="outlined"
              size={mobile ? "small" : "medium"}
              style={{ margin: "10px 4px" }}
            >
              View Public Posts
            </Button>
          </div>
        </Paper>
      ) : (
        posts.map((post) => <BlogPostListItem key={post.id} {...post} />)
      )}
      {nextToken && posts.length > 0 && (
        <Button
          color="info"
          variant="outlined"
          onClick={handleLoadNextPosts}
          style={{ marginBottom: 20 }}
        >
          Load More Posts
        </Button>
      )}
    </Container>
  );
};

export default React.memo(BlogPostList);
