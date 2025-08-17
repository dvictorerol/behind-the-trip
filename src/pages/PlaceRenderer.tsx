import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


const modules = import.meta.glob("./places/*.md", { as: "raw" });

const PlaceRenderer: React.FC = () => {
  const { placeName } = useParams<{ placeName: string }>();
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const matchedPath = Object.keys(modules).find((path) => {
      const name = path.split("/").pop()?.replace(".md", "").toLowerCase();
      return name === placeName?.toLowerCase();
    });

    if (matchedPath) {
      const importMarkdown = modules[matchedPath] as () => Promise<string>;
      importMarkdown().then(setMarkdown);
    } else {
      setMarkdown("## Post not found.");
    }
  }, [placeName]);

  return (
    <div className="entry-container">
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    img: ({ node, ...props }) => (
      <div className="figure-wrapper">
        <img {...props} className="markdown-image" />
      </div>
    ),
    em: ({ node, ...props }) => (
      <div className="figure-caption">
        <em {...props} />
      </div>
    ),
  }}
>
  {markdown}
</ReactMarkdown>

    </div>
  );
};

export default PlaceRenderer;
