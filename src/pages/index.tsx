import PostCard from "@/components/base/PostCard";
import Layout from "@/components/layout/Layout";
import { API_BASE_URL } from "@/config/app";
import { joinArrObjectToString } from "@/utils/joinArrObjectToString";
import { GetServerSidePropsContext } from "next";

type Props = {
  posts: {
    results: Record<string, any>[];
    [k: string]: any;
  };
};
export default function Home({ posts }: Props) {
  return (
    <Layout>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {posts?.results?.map((post: { [k: string]: any }) => (
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
                image: post.cover?.external?.url,
              }}
              key={post.id}
            />
          ))}
        </div>
        {/* {isLoading && (
        <h3 className="text-xl text-gray-500 font-semibold text-center">
          Loading...
        </h3>
      )} */}
        <div className="flex justify-center mt-10">
          <button
            className="py-2 px-4 rounded-sm bg-black/60 text-white font-semibold"
            // onClick={onLoadMore}
          >
            Load More
          </button>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const result = await fetch(`${API_BASE_URL}/api/posts`).then((res) =>
      res.json()
    );
    return {
      props: {
        posts: result.data,
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      props: {
        posts: { results: [] },
      },
    };
  }
};
