import React from "react";
import hljs from "highlight.js";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.bubble.css";
import "highlight.js/scss/atom-one-dark.scss";
import * as ReactQuill from "react-quill";

interface QuillProps {
  onUpdate: (values: string) => void;
  passedBody: string;
}

const modules = {
  syntax: {
    highlight: (text: string): string => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    [{ align: "" }],
    [{ align: "center" }],
    [{ align: "justify" }],
    [{ align: "right" }],
    ["code-block"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const QuillEditor: React.FC<QuillProps> = ({ onUpdate, passedBody }) => {
  hljs.configure({
    languages: ["javascript", "typescript", "python", "html", "scss"],
  });
  hljs.highlightAll();

  const handleUpdate = (body: string): void => {
    onUpdate(body);
  };

  return (
    <ReactQuill
      value={passedBody}
      onChange={(body: string): void => handleUpdate(body)}
      id="editor"
      modules={modules}
      theme="snow"
    />
  );
};

export default QuillEditor;
