import Link from "next/link";
import React from "react";
import Badge from "./Badge";
import imageDefault from "@/images/blur-image.png";

type Props = {
  post: { [k: string]: any };
};

const PostCard = ({ post }: Props) => {
  return (
    <div
      key={post.id}
      className="border rounded-md overflow-hidden relative max-w-sm m-auto h-full"
    >
      <div className="h-52 mb-4">
        <img
          src={post.image || imageDefault.src}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-4 py-2 pb-5">
        <h4
          className="font-semibold text-lg leading-6 mb-1 text-gray-800 hover:text-black break-word overflow-hidden"
          style={{
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            display: "-webkit-box",
          }}
        >
          <Link href={`/${post.slug}`} passHref>
            {post.title}
          </Link>
        </h4>
        <div className="text-xs text-gray-500 mb-2">
          {post.createdAt && new Date(post.createdAt).toDateString()}
        </div>
        <div
          className="mb-2 break-all overflow-hidden"
          style={{
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            display: "-webkit-box",
          }}
        >
          {post.description.slice(0, 150)}
        </div>
        {post.tags?.length ? (
          <div className="flex flex-wrap gap-1 my-2">
            {post.tags.map((tag) => (
              <Badge key={tag.id} title={tag.name} selected />
            ))}
          </div>
        ) : null}
        <Link
          href={`/${post.slug}`}
          passHref
          className="text-gray-700 hover:underline transition-all uppercase text-xs
              "
        >
          Read More...
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
