"use client";

import Image from "next/image";

type Tag = {
  id: number;
  name: string;
};

type Props = {
  image: string;
  title: string;
  description: string;
  tags: Tag[] | undefined;
  onClick?: () => void;
};

export default function Card(props: Props) {
  const { image, title, description, tags, onClick } = props;
  return (
    <div
      className="w-full flex flex-col gap-2 p-3 text-black bg-white h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full relative aspect-square">
        <Image src={image} fill alt={title} />
      </div>
      <h5 className="font-medium line-clamp-1">{title}</h5>
      <p className="line-clamp-3 text-xs text-gray-600">{description}</p>
      {tags && (
        <ul className="flex flex-wrap items-center gap-3 text-sm">
          {tags.map((tag) => (
            <li key={tag.id} className="border-[1px] border-gray-400 px-3 py-1">
              {tag.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
