import Badge from "@/components/base/Badge";
import FormGroup from "@/components/base/FormGroup";
import FormInput from "@/components/base/FormInput";
import FormLabel from "@/components/base/FormLabel";
import HeadingAdminPage from "@/components/base/HeadingAdminPage";
import AdminLayout from "@/components/layout/Admin";
import React, { useCallback, useMemo } from "react";

import { useForm } from "react-hook-form";
import { postValidator } from "@/validators/post.validator";
import AlertMessage from "@/components/base/AlertMessage";
import dynamic from "next/dynamic";
import httpClient from "@/libs/httpClient";
import { toast } from "@/components/base/toast/toast";
import { GetServerSidePropsContext } from "next";
import { joinArrObjectToString } from "@/utils/joinArrObjectToString";
import { withAuthPage } from "@/middlewares/withAuthPage";

type Props = {
  tags: string[];
  post: Record<string, any>;
};

const EditPost = ({ tags, post }: Props) => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/base/Editor"), {
        ssr: false,
      }),
    []
  );
  const initDataPost = useMemo<{
    title: string;
    tags: string[];
    description: string;
    content: string;
  }>(
    () => ({
      title: post.title,
      tags: post.tags.map((tag) => tag.name),
      description: post.description,
      content: post.content,
    }),
    [post]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({ defaultValues: initDataPost });

  const onSave = useCallback(
    async (data) => {
      try {
        await httpClient
          .put(`/api/admin/posts/${post.id}`, data)
          .then((res) => res.data);
        toast({ type: "success", message: "Update successfully" });
      } catch (error) {
        console.log("error", error);
        toast({ type: "error", message: "Add failed" });
      }
    },
    [post]
  );
  return (
    <AdminLayout>
      <HeadingAdminPage title="Update post" />
      <div>
        <form onSubmit={handleSubmit(onSave)}>
          <FormInput
            label="Title"
            required
            error={errors?.title?.message}
            {...register("title", postValidator.title)}
          />
          <FormInput
            label="Description"
            isTextArea
            error={errors?.description?.message}
            {...register("description", postValidator.description)}
          />
          <FormGroup>
            <FormLabel label="Tags" />
            <div>
              {tags.map((tag) => {
                const selected = watch("tags").includes(tag);

                return (
                  <Badge
                    key={tag}
                    title={tag}
                    className="cursor-pointer"
                    selected={selected}
                    onClick={() => {
                      const tagsSelected = getValues("tags");
                      if (selected) {
                        setValue(
                          "tags",
                          tagsSelected.filter(
                            (tagSelected) => tagSelected !== tag
                          )
                        );
                      } else {
                        setValue("tags", [...tagsSelected, tag]);
                      }
                    }}
                  />
                );
              })}
            </div>
          </FormGroup>
          <FormGroup>
            <FormLabel label="Content" required />
            <div>
              <Editor
                data={watch("content")}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setValue("content", data);
                }}
              />
              <AlertMessage message={errors?.content?.message} />

              <input
                type="text"
                className="hidden"
                {...register("content", postValidator.content)}
                value={watch("content")}
              />
            </div>
          </FormGroup>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditPost;

export const getServerSideProps = withAuthPage(
  async (context) => {
    try {
      const postId = (context?.params?.postId || "") as string;
      const resultTag = await httpClient
        .get("/api/admin/tags")
        .then((res) => res.data.data);
      const postDetail = await httpClient
        .get(`/api/posts/${postId}`)
        .then((res) => res.data.data);

      const tags = resultTag.results.map(
        (tag) => tag.properties.Name.title[0]?.plain_text
      );
      return {
        props: {
          tags,
          post: {
            id: postId,
            title: joinArrObjectToString(
              postDetail.properties.Title.title,
              "plain_text"
            ),
            content: joinArrObjectToString(
              postDetail.properties.Content.rich_text,
              "plain_text"
            ),
            description: joinArrObjectToString(
              postDetail.properties.Description.rich_text,
              "plain_text"
            ),
            slug: postDetail.id,
            createdAt: postDetail.created_time,
            tags: postDetail.properties.Tags.multi_select,
            image: postDetail.cover?.external?.url || null,
          },
        },
      };
    } catch (error) {
      return {
        notFound: true,
      };
    }
  }
);
