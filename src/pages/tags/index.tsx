import Layout from "@/components/layout/Layout";
import httpClient from "@/libs/httpClient";
import Link from "next/link";
import React from "react";

type Props = {
  tags: Record<string, any>[];
};

const TagsPage = ({ tags }: Props) => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-5xl font-bold">Tags</h1>
      </div>
      <div className="h-[2px] w-full bg-gray-400 mb-8"></div>
      {tags.length ? (
        <div className="flex flex-wrap gap-6">
          {tags.map((tag) => (
            <Link
              href={`/tags/${tag.properties.Name.title[0].plain_text}`}
              key={tag.id}
              passHref
            >
              <div
                className="grid place-content-center w-40 h-40 text-white font-semibold text-2xl rounded-md"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
                }}
              >
                {tag.properties.Name.title[0].plain_text}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-4xl text-black">Not found tags</h2>
        </div>
      )}
    </Layout>
  );
};

export default TagsPage;

export const getServerSideProps = async () => {
  try {
    const result = await httpClient
      .get(`/api/tags`)
      .then((res) => res.data.data);

    return {
      props: {
        tags: result?.results || [],
      },
    };
  } catch (error) {
    console.log("eror", error);
    return {
      props: {
        tags: [],
      },
    };
  }
};
