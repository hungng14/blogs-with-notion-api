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

type Props = {
  tags: string[];
};

const AddPost = ({ tags }: Props) => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/base/Editor"), {
        ssr: false,
      }),
    []
  );
  const initNewPost = useMemo<{
    title: string;
    tags: string[];
    description: string;
    content: string;
  }>(
    () => ({
      title: "",
      tags: [],
      description: "",
      content: "",
    }),
    []
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
    reset: resetForm,
  } = useForm({ defaultValues: initNewPost });

  const onSave = useCallback(
    async (data) => {
      try {
        await httpClient
          .post("/api/admin/posts/add", data)
          .then((res) => res.data);
        resetForm(initNewPost);
        toast({ type: "success", message: "Add successfully" });
      } catch (error) {
        console.log("error", error);
        toast({ type: "error", message: "Add failed" });
      }
    },
    [resetForm, initNewPost]
  );
  return (
    <AdminLayout>
      <HeadingAdminPage title="Add new post" />
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

export default AddPost;

export const getServerSideProps = async () => {
  try {
    const resultTag = await httpClient
      .get("/api/admin/tags")
      .then((res) => res.data.data);
    const tags = resultTag.results.map(
      (tag) => tag.properties.Name.title[0]?.plain_text
    );
    return {
      props: {
        tags,
      },
    };
  } catch (error) {
    return {
      props: {
        tags: [],
      },
    };
  }
};
