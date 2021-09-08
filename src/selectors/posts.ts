import { FiltersState } from "./../store/filters.i";
import { Post } from "./../store/posts.i";
import moment from "moment";
import checkTags from "./tags";

export const selectPosts = (
  posts: Post[],
  { text, sortBy, startDate, endDate }: FiltersState,
) => {
  return posts
    .filter((post) => {
      console.log(post);
      const textMatch = post.title.toLowerCase().includes(text.toLowerCase());
      const tagsMatch = checkTags(post.tags, text);
      const authorMatch = post.author.toLowerCase().includes(text.toLowerCase());
      if (sortBy === "tags") {
        return tagsMatch;
      } else if (sortBy === "author") {
        return authorMatch;
      } else {
        return textMatch;
      }
    })
    .sort((a, b) => {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
};
