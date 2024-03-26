import { diffChars, diffLines, diffSentences } from "diff";

// import * as React from "react";
// import * as diff from "diff";

// const ByLines: React.FC<DiffHighlightProps> = ({ oldHtml, newHtml }) => {
//   const differences = diff.diffLines(oldHtml, newHtml);

//   return (
//     <div>
//       {differences.map((part, index) => (
//         <span
//           key={index}
//           style={{
//             color: part.added ? "green" : part.removed ? "red" : "grey",
//           }}
//         >
//           {part.value}
//         </span>
//       ))}
//     </div>
//   );
// };

// const BySentences: React.FC<DiffHighlightProps> = ({ oldHtml, newHtml }) => {
//   const differences = diff.diffSentences(oldHtml, newHtml);

//   return (
//     <div>
//       {differences.map((part, index) => (
//         <span
//           key={index}
//           style={{
//             color: part.added ? "green" : part.removed ? "red" : "grey",
//           }}
//         >
//           {part.value}
//         </span>
//       ))}
//     </div>
//   );
// };

type DiffHighlightProps = {
  oldHtml: string;
  newHtml: string;
};

const DiffHighlight: React.FC<DiffHighlightProps> = ({ oldHtml, newHtml }) => {
  const getHighlightedDiff = (oldStr: string, newStr: string) => {
    const diff = diffSentences(oldStr, newStr);
    let result = "";
    diff.forEach(
      (part: { added?: boolean; removed?: boolean; value: string }) => {
        const color = part.added ? "green" : part.removed ? "red" : "black";
        const backgroundColor = part.added
          ? "#d3fcd5"
          : part.removed
          ? "#ffd6d6"
          : "transparent";

        result += `<span style="color: ${color}; background-color: ${backgroundColor};">${part.value}</span>`;
      }
    );

    return { __html: result };
  };

  return (
    <div className="px-32">
      <div dangerouslySetInnerHTML={getHighlightedDiff(oldHtml, newHtml)} />;
      {/* <ByLines newHtml={newHtml} oldHtml={oldHtml} />
      <BySentences newHtml={newHtml} oldHtml={oldHtml} /> */}
    </div>
  );
};

export { DiffHighlight };
