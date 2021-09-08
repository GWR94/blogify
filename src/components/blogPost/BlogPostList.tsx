import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CircularProgress,
  Container,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import BlogPostListItem from "./BlogPostListItem";
import { AppState, GraphQLResult } from "../../store/store";
import Button from "../../utils/components/MuiButton";
import { useHistory } from "react-router-dom";
import { breakpoints } from "../../utils";
import { API, graphqlOperation } from "aws-amplify";
import { listPosts } from "../../graphql/queries";
import { Post } from "../../store/posts.i";
import * as actions from "../../actions/posts.action";

interface BlogPostListProps {
  isLoading: boolean;
  setViewPosts: (view: "all" | "personal") => void;
}

const BlogPostList = ({ isLoading, setViewPosts }: BlogPostListProps): JSX.Element => {
  const { posts, nextToken } = useSelector(({ posts }: AppState) => posts);

  const history = useHistory();
  const dispatch = useDispatch();
  const mobile = useMediaQuery(breakpoints.only("xs"));

  console.log(posts);

  const handleLoadNextPosts = async (): Promise<void> => {
    if (!nextToken) return;
    const { data } = (await API.graphql(
      graphqlOperation(listPosts, { nextToken }),
    )) as GraphQLResult<{ listPosts: { items: Post[]; nextToken: string | null } }>;
    if (data?.listPosts.items) {
      dispatch(actions.loadMorePosts(data.listPosts.items, data.listPosts.nextToken));
    }
  };

  return (
    <Container>
      {isLoading ? (
        <div className="list__loadingContainer">
          <CircularProgress size={50} className="list__loader" />
        </div>
      ) : posts.length === 0 ? (
        <Paper elevation={4} className="list__noDataContainer">
          <Typography variant="h5" gutterBottom>
            No Posts
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            To have posts show up in your feed, create a post or two - or begin following
            users' to have theirs show up on your feed!
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
              onClick={(): void => setViewPosts("all")}
              variant="outlined"
              size={mobile ? "small" : "medium"}
              style={{ margin: "10px 4px" }}
            >
              View Public Posts
            </Button>
          </div>
        </Paper>
      ) : (
        posts.map((post) => {
          return <BlogPostListItem key={post.id} {...post} />;
        })
      )}
      {nextToken && (
        <Button color="primary" variant="outlined" onClick={handleLoadNextPosts}>
          Load More Posts
        </Button>
      )}
    </Container>
  );
};

export default React.memo(BlogPostList);
