import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import {
  FiltersState,
  SetEndDateAction,
  SetStartDateAction,
  SetTextFilterAction,
} from "../store/filters.i";

const initialState: FiltersState = {
  text: "",
  sortBy: "title",
  startDate: moment().startOf("year"),
  endDate: moment().endOf("year"),
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTextFilter: (state, action: PayloadAction<SetTextFilterAction>) => {
      return {
        ...state,
        text: action.payload.text,
      };
    },
    setStartDate: (state, action: PayloadAction<SetStartDateAction>) => {
      return {
        ...state,
        startDate: action.payload.startDate,
      };
    },
    setEndDate: (state, action: PayloadAction<SetEndDateAction>) => {
      return {
        ...state,
        endDate: action.payload.endDate,
      };
    },
    sortByTags: (state) => {
      return {
        ...state,
        sortBy: "tags",
      };
    },
    sortByTitle: (state) => {
      return {
        ...state,
        sortBy: "title",
      };
    },
    sortByAuthor: (state) => {
      return {
        ...state,
        sortBy: "author",
      };
    },
  },
});

export const { setTextFilter } = filtersSlice.actions;
