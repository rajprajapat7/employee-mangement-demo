import { ContentBlock, ContentState, DraftHandleValue } from "draft-js";
import "draft-js/dist/Draft.css";
import { IconButton, Toolbar, Typography } from "@mui/material";

import React, { FC, JSXElementConstructor, ReactElement, useState } from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "draft-js/dist/Draft.css";

const BlogEditor : FC= () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): "handled" | "not-handled" => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (command === "bold") {
    }
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onQuoteClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, "blockquote"));
  };

  const onLinkClick = () => {
    const selection = editorState.getSelection();
    const link = window.prompt("Enter a URL:");
    if (!link) {
      setEditorState(editorState);
      return;
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link,
    });
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentWithEntity,
    });
    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  const handleKeyBinding = (e: React.KeyboardEvent): string | null => {
    if (e.keyCode === 83 /* `S` key */ && (e.ctrlKey || e.metaKey)) {
      return "save";
    }
    return getDefaultKeyBinding(e);
  };

  const handleBeforeInput = (
    chars: string,
    editorState: EditorState,
    eventTimeStamp: number
  ): "handled" | "not-handled" => {
    if (chars === " ") {
      const currentContent = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const block = currentContent.getBlockForKey(selection.getStartKey());
      const blockType = block.getType();
      if (blockType === "blockquote") {
        const blockWithoutQuote = block.set("type", "unstyled") as ContentBlock;
        const newContentState = ContentState.createFromBlockArray(
          currentContent
            .getBlockMap()
            .set(selection.getStartKey(), blockWithoutQuote)
            .toArray()
        );
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "remove-range"
        );
        setEditorState(newEditorState);
      }
    }
    return "not-handled";
  };

  const exportHtml = () => {
    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState);
    // console.log(html);
    // You can use the 'html' variable to save or display the HTML content
  };

  return (
    <div className="mx-96">
      <Toolbar>
        <IconButton
          color={
            editorState.getCurrentInlineStyle().has("BOLD")
              ? "primary"
              : "default"
          }
          onClick={onBoldClick}
        >
          B
        </IconButton>
        <IconButton onClick={onQuoteClick}>"</IconButton>
        <IconButton onClick={onLinkClick}>U</IconButton>
        <IconButton onClick={exportHtml}>Export HTML</IconButton>
      </Toolbar>
      <Typography
        component="div"
        style={{
          border: "1px solid #ccc",
          minHeight: "100px",
          padding: "10px",
        }}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={handleKeyBinding}
          handleBeforeInput={handleBeforeInput}
          placeholder="Write your blog here..."
        />
      </Typography>
    </div>
  );
};

export default BlogEditor;
