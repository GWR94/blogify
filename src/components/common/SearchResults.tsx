import { Container, Paper, Typography, useMediaQuery } from "@material-ui/core";
import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { listPosts } from "../../graphql/queries";
import { AppState, GraphQLResult } from "../../store/store";
import { breakpoints } from "../../utils";
import Button from "../../utils/components/MuiButton";
import LoginModal from "../auth/LoginModal";
import BlogPostListItem from "../blogPost/BlogPostListItem";
import Header from "./Header";
import SearchAutoComplete from "./SearchAutoComplete";
import { Post } from "../../store/posts.i";
import Loading from "./Loading";
import { postsSlice } from "../../slices/post.slice";

const SearchResults = (): JSX.Element => {
  // retrieve posts, nextToken and uid from store
  const [isLoading, setLoading] = useState(true);
  const { posts, nextToken } = useSelector(({ posts }: AppState) => posts);
  const { uid } = useSelector(({ auth }: AppState) => auth);

  // modal to control open state of LoginModal
  const [isOpen, setOpen] = useState(false);
  const [searchQuery, setQuery] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const mobile = useMediaQuery(breakpoints.only("xs"));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    if (query) {
      setQuery(query);
    }
    setLoading(false);
  }, [window.location]);

  const handleLoadNextPosts = async (): Promise<void> => {
    if (!nextToken) return;
    const { data } = (await API.graphql({
      query: listPosts,
      variables: { nextToken },
      authMode: "AWS_IAM",
    })) as GraphQLResult<{ listPosts: { items: Post[]; nextToken: string | null } }>;
    if (data) {
      dispatch(
        postsSlice.actions.loadMorePosts({
          posts: data.listPosts.items,
          nextToken: data.listPosts.nextToken,
        }),
      );
    }
  };

  console.log(searchQuery);
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div>
        <Header />
        <div className="search__header">
          <Container>
            <Typography variant="h4" className="app__title">
              Search Posts
            </Typography>
            <Typography variant="subtitle2">
              Search through a variety of topics by inputting your criteria below
            </Typography>
            <div className="search__input--container">
              <SearchAutoComplete query={searchQuery} />
            </div>
          </Container>
        </div>
        <Container>
          {posts.length > 0 ? (
            posts.map((post) => <BlogPostListItem key={post.id} {...post} search />)
          ) : (
            <Paper elevation={4} className="list__noDataContainer">
              <Typography variant="h5" gutterBottom>
                No Posts
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                To have posts show up in your feed, create a post or two - or begin
                following users&apos; to have theirs show up on your feed!
              </Typography>
              <div>
                {uid ? (
                  <Button
                    color="primary"
                    onClick={(): void => history.push("/create")}
                    variant="outlined"
                    style={{ margin: "10px 4px" }}
                    size={mobile ? "small" : "medium"}
                  >
                    Create Post
                  </Button>
                ) : (
                  <Button
                    color="error"
                    onClick={(): void => setOpen(true)}
                    variant="outlined"
                    style={{ margin: "10px 4px" }}
                    size={mobile ? "small" : "medium"}
                  >
                    Login to Post
                  </Button>
                )}
                <Button
                  color="primary"
                  onClick={(): void => history.push("/dashboard?view=all")}
                  variant="outlined"
                  size={mobile ? "small" : "medium"}
                  style={{ margin: "10px 4px" }}
                >
                  View Public Posts
                </Button>
              </div>
            </Paper>
          )}
          {nextToken && (
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
      </div>
      <LoginModal open={isOpen} onClose={(): void => setOpen(false)} />
    </>
  );
};

export default SearchResults;
