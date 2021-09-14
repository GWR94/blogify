import { CircularProgress } from "@material-ui/core";
import React from "react";
import Header from "./Header";

interface Props {
  size?: number;
}

const Loading = ({ size }: Props): JSX.Element => {
  return (
    <>
      <Header />
      <div className="loading__container">
        <CircularProgress size={size || 50} />
      </div>
    </>
  );
};

export default Loading;
