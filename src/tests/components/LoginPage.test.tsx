import React from "react";
import LoginPage from "../../components/auth/LoginPage";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStore } from "redux-mock-store";
import { AppState } from "../../store/store";
import moment from "moment";
/**
 * @jest-environment jsdom
 */

const initialState: AppState = {
  auth: {
    uid: "123",
    name: "Bill",
    email: "bill@test.com",
    followers: [],
    following: [],
  },
  posts: {
    posts: [],
    nextToken: null,
    comments: [],
  },
  filters: {
    text: "",
    sortBy: "title",
    startDate: moment(100),
    endDate: moment(1000),
  },
};

const mockStore = configureStore();

describe("<LoginPage />", () => {
  it("should render correctly when the user is logged in", () => {
    let store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
