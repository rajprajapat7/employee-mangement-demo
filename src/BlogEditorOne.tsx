import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { Button } from "@mui/material";
import ColorizeOutlinedIcon from "@mui/icons-material/ColorizeOutlined";
interface RichTextEditorProps {
  onSave: (id: string, html: string) => null;
  id: string;
}
const RichTextEditor = ({ id, onSave }: RichTextEditorProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    console.log("Saving content:", rawContentState);

    const html = stateToHTML(contentState);
    onSave(id, html);
  };

  return (
    <div className="ml-32 flex flex-col items-center">
      <div className="overflow-auto w-full relative        ">
        <Editor
          spellCheck={true}
          editorState={editorState}
          ariaAutoComplete="on"
          toolbarClassName="toolbar-class "
          editorClassName=" editor-class     w-3/4 max-h-56 min-h-56  border-solid border-gray-500 "
          toolbar={{
            options: [
              "history",
              "blockType",
              "inline",
              "colorPicker",
              "textAlign",
              "list",
              "link",
              "embedded",
              "image",
            ],
            inline: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: [
                "bold",
                "italic",
                // "underline",
                // "strikethrough",
                // "monospace",
                // "superscript",
                // "subscript",
              ],
            },
            blockType: {
              inDropdown: true,
              options: [
                "Normal",
                "H1",
                "H2",
                "H3",
                "H4",
                "H5",
                "H6",
                "Blockquote",
                "Code",
              ],
              list: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ["unordered", "ordered", "indent", "outdent"],
              },
              colorPicker: {
                icon: <ColorizeOutlinedIcon />,
                className: undefined,
                component: undefined,
                popupClassName: undefined,
                colors: [
                  "rgb(97,189,109)",
                  "rgb(26,188,156)",
                  "rgb(84,172,210)",
                  "rgb(44,130,201)",
                  "rgb(147,101,184)",
                  "rgb(71,85,119)",
                  "rgb(204,204,204)",
                  "rgb(65,168,95)",
                  "rgb(0,168,133)",
                  "rgb(61,142,185)",
                  "rgb(41,105,176)",
                  "rgb(85,57,130)",
                  "rgb(40,50,78)",
                  "rgb(0,0,0)",
                  "rgb(247,218,100)",
                  "rgb(251,160,38)",
                  "rgb(235,107,86)",
                  "rgb(226,80,65)",
                  "rgb(163,143,132)",
                  "rgb(239,239,239)",
                  "rgb(255,255,255)",
                  "rgb(250,197,28)",
                  "rgb(243,121,52)",
                  "rgb(209,72,65)",
                  "rgb(184,49,47)",
                  "rgb(124,112,107)",
                  "rgb(209,213,216)",
                ],
              },
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
            },
          }}
          wrapperClassName="wrapper-class"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <br />
      <Button variant="outlined" className="w-5" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default RichTextEditor;
