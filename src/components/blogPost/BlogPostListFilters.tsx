import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import * as actions from "../../slices/filters.action";
import moment from "moment";
import { AppState } from "../../store/store";

export const BlogPostListFilters: React.FC = (): JSX.Element => {
  const [calendarFocused, setCalendarFocused] = useState(null);
  const dispatch = useDispatch();

  const { sortBy, text } = useSelector((state: AppState) => state.filters);

  const onTextChange = (e) => {
    dispatch(actions.setTextFilter(e.target.value));
  };

  const onSortChange = (e) => {
    if (e.target.value === "title") {
      dispatch(actions.sortByTitle());
    } else if (e.target.value === "tags") {
      dispatch(actions.sortByTags());
    } else if (e.target.value === "author") {
      dispatch(actions.sortByAuthor());
    }
  };

  return (
    <div className="filters__outerContainer">
      <div className="filters__container">
        <FormControl variant="outlined" fullWidth style={{ width: 200, marginRight: 10 }}>
          <InputLabel variant="outlined" title="Sort Method">
            Sort Method
          </InputLabel>
          <Select
            variant="outlined"
            fullWidth
            value={sortBy}
            onChange={(sortBy) => onSortChange(sortBy)}
            label="Sort Method"
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="tags">Tags</MenuItem>
            <MenuItem value="author">Author</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="text"
          variant="outlined"
          fullWidth
          placeholder={
            sortBy !== "tags"
              ? sortBy === "author"
                ? "Filter by Author"
                : "Filter by Title"
              : "Filter by Tags"
          }
          value={text}
          onChange={onTextChange}
        />
      </div>
    </div>
  );
};

export default BlogPostListFilters;
