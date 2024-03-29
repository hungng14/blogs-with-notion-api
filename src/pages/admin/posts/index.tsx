import HeadingAdminPage from "@/components/base/HeadingAdminPage";
import AdminLayout from "@/components/layout/Admin";
import httpClient from "@/libs/httpClient";
import { joinArrObjectToString } from "@/utils/joinArrObjectToString";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Badge from "@/components/base/Badge";
import { toast } from "@/components/base/toast/toast";
import { withAuthPage } from "@/middlewares/withAuthPage";
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";

const PostsPage = () => {
  const router = useRouter();
  const [statusPublish, setStatusPublish] = useState<Record<string, boolean>>(
    {}
  );

  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-list-posts"],
    queryFn: () =>
      httpClient.get("/api/admin/posts").then((res) => res.data.data.results),
  });

  const onPublishPost = useCallback(
    async (id: string, firstValueChecked: boolean) => {
      try {
        const isChecked =
          typeof statusPublish[id] === "boolean"
            ? !statusPublish[id]
            : firstValueChecked;
        setStatusPublish((stt) => ({ ...stt, [id]: isChecked }));
        const result = await httpClient
          .put(`/api/admin/posts/${id}/publish`, { publish: isChecked })
          .then((res) => res.data);
        toast(
          {
            type: "success",
            message: `${isChecked ? "Publish" : "Unpublish"}  successfully`,
          },
          3000
        );
      } catch (error) {
        toast({ type: "error", message: "Publish failed" }, 5000);
      }
    },
    [statusPublish]
  );
  return (
    <AdminLayout>
      <HeadingAdminPage
        title="List Posts"
        onCreate={() => router.push("/admin/posts/add")}
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {isLoading ? (
          <ScaleLoader className="text-center" color="rgb(53 162 185)" />
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 w-52">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Description
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 w-52">
                  <div className="flex items-center">
                    Created At
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 w-32">
                  <span>Tags</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span>Publish</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => (
                <tr
                  key={idx}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white w-52"
                  >
                    {joinArrObjectToString(
                      post.properties.Title.title,
                      "plain_text"
                    )}
                  </th>
                  <td className="px-6 py-4">
                    {joinArrObjectToString(
                      post.properties.Description.rich_text,
                      "plain_text"
                    )?.slice(0, 50) + "..."}
                  </td>

                  <td className="px-6 py-4 w-52">
                    {dayjs(new Date(post.created_time)).format(
                      "DD-MM-YYYY HH:mm"
                    )}
                  </td>
                  <td className="px-6 py-4 w-32">
                    <div className="flex flex-wrap gap-2">
                      {post.properties.Tags.multi_select.map((tag) => (
                        <Badge key={tag.id} title={tag.name} selected />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <input
                        defaultChecked={post.properties.Publish.checkbox}
                        onClick={() =>
                          onPublishPost(
                            post.id,
                            !post.properties.Publish.checkbox
                          )
                        }
                        readOnly
                        id="checked-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/posts/edit/${post.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default PostsPage;

export const getServerSideProps = withAuthPage((context) => {
  return {
    props: {},
  };
});
