import React from "react";

type EntryProps = {
  title: string;
  date: string;
  body: string;
  images: { src: string; alt?: string; caption?: string }[];
};

const Entry: React.FC<EntryProps> = ({ title, date, body, images = [] }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8 prose prose-neutral dark:prose-invert">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500 mb-6">{date}</p>

      <div className="whitespace-pre-wrap">{body}</div>

      {images.length > 0 && (
        <div className="mt-8 space-y-8">
          {images.map((img, idx) => (
            <figure key={idx} className="flex flex-col items-center">
              <img
                src={img.src}
                alt={img.alt || ""}
                className="rounded-lg shadow-sm max-w-full"
              />
              {img.caption && (
                <figcaption className="mt-2 text-sm text-gray-500 italic">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </article>
  );
};

export default Entry;
