import React from "react";
import { shallow } from "enzyme";
import LoadingPage from "../../components/common/LoadingPage";

test("should render the LoadingPage component properly", () => {
  const wrapper = shallow(<LoadingPage />);
  expect(wrapper).toMatchSnapshot();
});
