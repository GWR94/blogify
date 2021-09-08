import { Moment } from "moment";

export interface FiltersState {
  text: string;
  sortBy: "title" | "tags" | "title" | "author";
  startDate: Moment;
  endDate: Moment;
}

export const SET_TEXT_FILTER = "SET_TEXT_FILTER";
export const SORT_BY_TAGS = "SORT_BY_TAGS";
export const SORT_BY_TITLE = "SORT_BY_TITLE";
export const SORT_BY_AUTHOR = "SORT_BY_AUTHOR";
export const SET_START_DATE = "SET_START_DATE";
export const SET_END_DATE = "SET_END_DATE";

export interface SetTextFilterAction {
  type: typeof SET_TEXT_FILTER;
  text: string;
}

export interface SortByTagsAction {
  type: typeof SORT_BY_TAGS;
}

export interface SortByAuthorAction {
  type: typeof SORT_BY_AUTHOR;
}

export interface SortByTitleAction {
  type: typeof SORT_BY_TITLE;
}

export interface SetStartDateAction {
  type: typeof SET_START_DATE;
  startDate: Moment;
}

export interface SetEndDateAction {
  type: typeof SET_END_DATE;
  endDate: Moment;
}

export declare type FiltersActionTypes =
  | SetEndDateAction
  | SetStartDateAction
  | SetTextFilterAction
  | SortByAuthorAction
  | SortByTagsAction
  | SortByTitleAction;
