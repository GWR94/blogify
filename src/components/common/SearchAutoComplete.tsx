import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { useDispatch } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { listPosts } from "../../graphql/queries";
import * as actions from "../../actions/posts.action";
import { GraphQLResult } from "../../store/store";
import { Post } from "../../store/posts.i";
import { openSnackbar } from "../../utils/components/Notifier";
import { capitalize } from "../../utils";

interface AutoCompleteProps {
  // search query passed from parent (optional)
  query?: string;
  // boolean value to determine whether to redirect to search page or not
  redirect?: boolean;
}

/**
 * Functional component which renders a search TextField with auto
 * complete features. Once the user has requested a search, the post
 * redux state will be updated with posts that match the search query.
 */
const SearchAutoComplete = ({
  query,
  redirect = false,
}: AutoCompleteProps): JSX.Element => {
  const [searchQuery, setQuery] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  // autofill options
  const searchOptions = [
    "Fundamentals",
    "Python",
    "JavaScript",
    "TypeScript",
    "CSS",
    "Solidity",
    "Blockchain",
    "Cryptocurrency",
    "Strings",
    "Optimization",
  ];

  useEffect(() => {
    // if query prop is passed, set it into state
    if (query) setQuery(query);
  }, []);

  /**
   * Function to handle a user determined search, which will search through
   * all of the posts to find all matches and store them in the posts' redux
   * state.
   * @param searchQuery - The query that the user wishes to search for
   */
  const handleSearch = async (query: string): Promise<void> => {
    console.log(capitalize(query));
    try {
      const { data } = (await API.graphql({
        query: listPosts,
        variables: {
          filter: {
            // search to see if any tag from any post matches the search query
            tags: {
              contains: capitalize(query),
            },
          },
          authMode: "AWS_IAM",
        },
      })) as GraphQLResult<{
        listPosts: { items: Post[]; nextToken: string | null };
      }>;
      if (data?.listPosts.items) {
        // dispatch the action to store the posts and nextToken into the store.
        dispatch(actions.setPosts(data.listPosts.items, data.listPosts.nextToken));
        if (redirect) {
          history.push(`/search?query=${query}`);
        }
        setQuery("");
      }
    } catch (err) {
      // notify the user of any errors
      openSnackbar({
        severity: "error",
        message: "Unable to complete search. Please try again",
      });
    }
  };
  return (
    <Autocomplete
      options={searchOptions.sort((a, b) => (a > b ? 1 : -1))}
      autoComplete
      onKeyDown={(_e): void => {
        if (_e.key === "Enter") {
          handleSearch(searchQuery);
        }
      }}
      onChange={(_e, value: string | null): void => {
        if (value) handleSearch(value);
      }}
      renderInput={(params): JSX.Element => (
        <TextField
          {...params}
          id="searchField"
          margin="dense"
          value={searchQuery}
          onChange={(e): void => setQuery(e.target.value)}
          className="header__search"
          variant="outlined"
          style={{ width: 220, marginBottom: 8 }}
          placeholder="Search Topic..."
        />
      )}
    />
  );
};

export default SearchAutoComplete;
