import React from "react";
import { render, fireEvent, screen } from "../src/test-utils";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";

import BlogEditor from "../src/BlogEditor";
describe("BlogEditor", () => {
  it("renders the editor with default state", () => {
    render(<BlogEditor />);

    expect(screen.getByText("Write your blog here...")).toBeInTheDocument();
  });

  it("toggles bold text when the bold button is clicked", () => {
    render(<BlogEditor />);
    const boldButton = screen.getByText("B");
    fireEvent.click(boldButton);
    expect(boldButton).toHaveStyle("color: #1976d2"); // Assuming MUI's primary color is #1976d2
  });

  it("toggles blockquote when the quote button is clicked", () => {
    render(<BlogEditor />);
    const quoteButton = screen.getByText('"');
    fireEvent.click(quoteButton);
    expect(screen.getByText("Write your blog here...")).toHaveStyle(
      "border-left: 3px solid #ccc"
    );
  });

  // it("toggles link when the link button is clicked", () => {
  //   render(<BlogEditor />);
  //   const linkButton = screen.getByText("U");
  //   window.prompt.mockReturnValueOnce("https://www.example.com");
  //   fireEvent.click(linkButton);
  //   expect(linkButton).toHaveStyle("color: #1976d2");
  // });

  it("exports HTML when the export button is clicked", () => {
    render(<BlogEditor />);
    const exportButton = screen.getByText("Export HTML");
    const consoleSpy = jest.spyOn(console, "log");
    fireEvent.click(exportButton);
    const expectedHtml = "";
    expect(consoleSpy).toHaveBeenCalledWith(expectedHtml);
  });

  // it("handles key commands for saving", () => {
  //   render(<BlogEditor />);
  //   const editor = screen
  //     .getByPlaceholderText("Write your blog here...")
  //     .querySelector(".DraftEditor-root");
  //   fireEvent.keyDown(editor, { keyCode: 83, ctrlKey: true });
  //   // Assert any save logic here
  // });

  // it("handles before input correctly", () => {
  //   render(<BlogEditor />);
  //   const editor = screen
  //     .getByPlaceholderText("Write your blog here...")
  //     .querySelector(".DraftEditor-root");
  //   fireEvent.beforeInput(editor, { data: " " });
  //   // Assert any before input logic here
  // });
});
