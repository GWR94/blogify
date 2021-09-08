import { Button, capitalize, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import BlogPostListItem from "../blogPost/BlogPostListItem";
import Header from "./Header";

interface Props {}

const SearchResults = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const { posts, nextToken } = useSelector(({ posts }: AppState) => posts);

  const handleNewSearch = async (): Promise<void> => {};

  return (
    <div>
      <Header />
      <div>
        <TextField
          value={searchQuery}
          onChange={(e): void => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleNewSearch}>Search</Button>
      </div>
      {posts.map((post) => (
        <BlogPostListItem key={post.id} {...post} />
      ))}
    </div>
  );
};

export default SearchResults;
