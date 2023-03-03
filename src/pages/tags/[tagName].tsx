import PostCard from "@/components/base/PostCard";
import { GetServerSidePropsContext } from "next";
import httpClient from "@/libs/httpClient";
import { joinArrObjectToString } from "@/utils/joinArrObjectToString";
import Layout from "@/components/layout/Layout";

type Props = {
  tagName: string;
  posts: Record<string, any>[];
};

export default function PostsByTagId({ tagName, posts }: Props) {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-5xl font-bold">{tagName}</h1>
      </div>
      <div className="h-[2px] w-full bg-gray-400 mb-8"></div>
      {posts.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {posts.map((post) => (
            <PostCard
              post={{
                title: joinArrObjectToString(
                  post.properties.Title.title,
                  "plain_text"
                ),
                description: joinArrObjectToString(
                  post.properties.Description.rich_text,
                  "plain_text"
                ),
                slug: post.id,
                tags: post.properties.Tags.multi_select,
                createdAt: post.created_time,
                image: post.cover?.external?.url || post.cover?.file?.url,
              }}
              key={post.id}
            />
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-4xl text-gray-400 text-center font-bold uppercase">These no posts for this tag</h2>
        </div>
      )}
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const tagName = (context.params?.tagName || "") as string;
  try {
    const result = await httpClient
      .get(`/api/posts?tag=${tagName}`)
      .then((res) => res.data.data);

    return {
      props: {
        posts: result?.results || [],
        tagName,
      },
    };
  } catch (error) {
    console.log("eror", error);
    return {
      props: {
        posts: [],
        tagName,
      },
    };
  }
};
