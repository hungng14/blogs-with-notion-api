import httpClient from "@/libs/httpClient";
import { joinArrObjectToString } from "@/utils/joinArrObjectToString";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import postDetailStyle from '@/styles/PostDetail.module.css'

type Props = {
  postId: string;
  post: Record<string, any>;
};
const PostDetail = ({ post }: Props) => {
  return (
    <div>
      <h3 className="font-bold text-3xl mb-4">{post.title}</h3>
      <div className="text-xs text-gray-500 mb-4">
        {post.createdAt && new Date(post.createdAt).toDateString()}
      </div>
      <div className="mb-8">
        <img
          src={
            post.image ||
            "https://techcrunch.com/wp-content/uploads/2020/03/GettyImages-1153354404.jpg?w=1390&crop=1"
          }
          className="w-full h-80 object-cover rounded-md"
          alt=""
        />
      </div>
      <div
        className={`${postDetailStyle.postContent} mb-6`}
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="mb">
        <h4 className="text-xl font-bold">
          <Link href={"/tags"} className="hover:underline">
            Tags
          </Link>
          :
        </h4>
        <div className="flex gap-4 flex-wrap mt-2">
          {!!post.tags?.length &&
            post.tags.map((tag: any) => (
              <Link key={tag.id} passHref href={`/tag/${tag.name}`}>
                <span className={`block text-base font-light text-orange-500 py-1 px-2 hover:text-orange-600`}>
                  {tag.name}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const postId = (context.params?.postId || "") as string;
    const post = await httpClient
      .get(`/api/posts/${postId}`)
      .then((res) => res.data.data);
    if (!post) {
      throw new Error("Post Id not found");
    }

    return {
      props: {
        post: {
          id: postId,
          title: joinArrObjectToString(
            post.properties.Title.title,
            "plain_text"
          ),
          content: joinArrObjectToString(
            post.properties.Content.rich_text,
            "plain_text"
          ),
          description: joinArrObjectToString(
            post.properties.Description.rich_text,
            "plain_text"
          ),
          slug: post.id,
          createdAt: post.created_time,
          tags: post.properties.Tags.multi_select,
          image: post.cover?.external?.url
        },
        postId,
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      notFound: true,
    };
  }
}
