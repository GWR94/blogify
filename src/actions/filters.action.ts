import { Moment } from "moment";
import {
  SetEndDateAction,
  SetStartDateAction,
  SetTextFilterAction,
  SortByAuthorAction,
  SortByTagsAction,
  SortByTitleAction,
} from "./../store/filters.i";

// SET_TEXT_FILTER
export const setTextFilter = (text = ""): SetTextFilterAction => ({
  type: "SET_TEXT_FILTER",
  text,
});

// SORT_BY_DATE
export const sortByTags = (): SortByTagsAction => ({
  type: "SORT_BY_TAGS",
});

// SORT_BY_TILE
export const sortByTitle = (): SortByTitleAction => ({
  type: "SORT_BY_TITLE",
});

//SORT_BY_AUTHOR
export const sortByAuthor = (): SortByAuthorAction => ({
  type: "SORT_BY_AUTHOR",
});

// SET_START_DATE
export const setStartDate = (startDate: Moment): SetStartDateAction => ({
  type: "SET_START_DATE",
  startDate,
});

// SET_END_DATE
export const setEndDate = (endDate: Moment): SetEndDateAction => ({
  type: "SET_END_DATE",
  endDate,
});
