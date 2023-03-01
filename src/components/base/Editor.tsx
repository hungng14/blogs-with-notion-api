import React from "react";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({ ...props }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      {...props}
      // data="any"
      // onReady={(editor) => {
      //   // You can store the "editor" and use when it is needed.
      //   console.log(editor);
      // }}
      // onChange={(event, editor) => {
      //   const data = editor.getData();
      //   console.log({ data });
      // }}
      // onBlur={(event, editor) => {
      //   console.log("Blur.", editor);
      // }}
      // onFocus={(event, editor) => {
      //   console.log("Focus.", editor);
      // }}
    />
  );
};

export default Editor;
