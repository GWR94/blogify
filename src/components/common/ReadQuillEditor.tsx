import ReactQuill from "react-quill";
import React from "react";
import hljs from "highlight.js";
import "@styles/vs2015.css";
import CommentList from "./CommentList";

const modules = {
  syntax: {
    highlight: (text: string): string => hljs.highlightAuto(text).value,
  },
  toolbar: false,
};

interface ReadQuillProps {
  passedBody: string;
}

const ReadQuillEditor = ({ passedBody }: ReadQuillProps): JSX.Element => {
  return (
    <>
      <ReactQuill
        value={passedBody}
        modules={modules}
        readOnly
        className="readOnlyEditor"
      />
    </>
  );
};

export default ReadQuillEditor;
