import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
  };

  formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  render() {
    const { customHeight, value, onChange } = this.props;
    return (
      <div>
        <ReactQuill
          style={{ height: customHeight }}
          theme="snow"
          modules={this.modules}
          formats={this.formats}
          value={value || ""}
          onChange={(content, delta, source, editor) =>
            onChange(editor.getHTML())
          }
          // onChange={(content, delta, source, editor) => onChange(content)}
        />
        <style>
          {`
            .quill {
              border: 1px solid #d5d5da;
              border-radius: 5px;
              min-height: 100px !important;
              max-height: ${customHeight};
              overflow: hidden;
            }
            .ql-toolbar.ql-snow {
              border: none;
              border-bottom: 1px solid #d5d5da;
            }
            .ql-container.ql-snow {
              border: none;
            }

            .quill:hover {
              overflow-y: scroll;
            }

            .quill::-webkit-scrollbar {
              width: 0.5px;
            }
          `}
        </style>
      </div>
    );
  }
}
export default Editor;
