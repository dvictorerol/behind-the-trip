// src/pages/Entries.tsx
import React from "react";
import { Link } from "react-router-dom";

// make sure this path is correct relative to THIS FILE
const modules = import.meta.glob("./places/*.md", { as: "raw" });


console.log("Modules found:", Object.keys(modules));


const Places: React.FC = () => {
  const links = Object.keys(modules).map((path) => {
    const fileName = path.split("/").pop()?.replace(".md", "") || "";
    return {
      path: `/places/${fileName.toLowerCase()}`,
      name: fileName,
    };
  });

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">entries</h1>
      <ul className="space-y-2">
        {links.map((entry) => (
          <li key={entry.name}>
            <Link to={entry.path} className="text-blue-600 hover:underline">
              {entry.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Places;
