import React from "react";
import { shallow } from "enzyme";
import BlogDashboardPage from "../../components/blogPost/BlogDashboard";

test("should render BlogDashboardPage correctly", () => {
  const wrapper = shallow(<BlogDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
