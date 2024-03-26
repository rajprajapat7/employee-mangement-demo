import { diffChars } from "diff";

import React, { useRef, useEffect } from "react";
import "diff2html/bundles/css/diff2html.min.css";
import * as Diff2Html from "diff2html";

type DiffHighlightProps = {
  oldHtml: string;
  newHtml: string;
};


const DiffViewer: React.FC<DiffHighlightProps> = ({ oldHtml, newHtml }) => {
  const diffContainer = useRef<HTMLDivElement>(null);

  return <div ref={diffContainer} />;
};
export {  DiffViewer };
