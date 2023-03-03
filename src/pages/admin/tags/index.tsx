import HeadingAdminPage from "@/components/base/HeadingAdminPage";
import AdminLayout from "@/components/layout/Admin";
import httpClient from "@/libs/httpClient";
import { joinArrObjectToString } from "@/utils/joinArrObjectToString";
import React, { useState } from "react";
import dayjs from "dayjs";
import Badge from "@/components/base/Badge";
import { withAuthPage } from "@/middlewares/withAuthPage";
import CreateTagModal from "@/components/pages/admin/tags/CreateTagModal";
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";
import UpdateTagModal from "@/components/pages/admin/tags/UpdateTagModal";

const TagsPage = () => {
  const {
    data: tags,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-list-tags"],
    queryFn: () =>
      httpClient.get("/api/admin/tags").then((res) => res.data.data.results),
  });

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [tagInfo, setTagInfo] = useState<Record<string, any>>();

  return (
    <AdminLayout>
      <CreateTagModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onConfirm={() => {
          refetch();
        }}
      />
      <UpdateTagModal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        onConfirm={() => {
          refetch();
          setOpenUpdateModal(false);
        }}
        tagInfo={tagInfo}
      />
      <HeadingAdminPage
        title="List Tags"
        onCreate={() => setOpenCreateModal(true)}
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {isLoading ? (
          <ScaleLoader className="text-center" color="rgb(53 162 185)" />
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 w-52">
                  Name
                </th>

                <th scope="col" className="px-6 py-3 w-52">
                  Created At
                </th>

                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag, idx) => (
                <tr
                  key={idx}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white w-52"
                  >
                    <Badge
                      title={
                        joinArrObjectToString(
                          tag.properties.Name.title,
                          "plain_text"
                        ) as string
                      }
                      selected
                    />
                  </th>

                  <td className="px-6 py-4 w-52">
                    {dayjs(new Date(tag.created_time)).format(
                      "DD-MM-YYYY HH:mm"
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <span
                      onClick={() => {
                        setOpenUpdateModal(true);
                        setTagInfo(tag);
                      }}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    >
                      Edit
                    </span>
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

export default TagsPage;

export const getServerSideProps = withAuthPage((context) => {
  return {
    props: {},
  };
});
