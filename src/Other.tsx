import React, { Dispatch, SetStateAction, useState } from "react";
import BlogEditorOne from "./BlogEditorOne";
import { DiffHighlight } from "./Diff";
import { DiffViewer } from "./DiffOne";

function Other() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  console.log("🚀 ~ Other ~ first:", first);
  console.log("🚀 ~ Other ~ second:", second);
  const handleChange = (id: string, data: string) => {
    if (id === "1") {
      setFirst(data);
    } else {
      setSecond(data);
    }
    console.log("🚀 ~ handleChange ~ data:", data);
    console.log("🚀 ~ handleChange ~ id:", id);
    return null;
  };
  return (
    <div>
      <div className="w-full ml-32">
        <BlogEditorOne id="1" onSave={handleChange} />
        <BlogEditorOne id="2" onSave={handleChange} />
      </div>
      {/* <div className="ml-32 ">
        <td dangerouslySetInnerHTML={{ __html: first }} />
      </div> */}
      {second && first && <DiffHighlight newHtml={second} oldHtml={first} />}
    </div>
  );
}

export default Other;
