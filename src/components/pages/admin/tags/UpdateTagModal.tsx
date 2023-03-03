import FormInput from "@/components/base/FormInput";
import Modal, { Props } from "@/components/base/Modal";
import { toast } from "@/components/base/toast/toast";
import httpClient from "@/libs/httpClient";
import { joinArrObjectToString } from "@/utils/joinArrObjectToString";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

const UpdateTagModal = (
  props: Omit<Props, "title" | "children"> & { tagInfo?: Record<string, any> }
) => {
  const initData = useMemo(() => {
    if (props.tagInfo) {
      return {
        id: props.tagInfo.id,
        name: joinArrObjectToString(
          props.tagInfo.properties.Name.title,
          "plain_text"
        ) as string,
      };
    }
  }, [props.tagInfo]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm({ defaultValues: { name: "" } });
  useEffect(() => {
    if (initData) {
      resetForm(initData);
    }
  }, [initData, resetForm]);

  const mutation = useMutation({
    mutationFn: (updateTag) => {
      return httpClient.put(`/api/admin/tags/${initData?.id}`, updateTag);
    },
    onSuccess() {
      toast({ type: "success", message: "Update successfully" });
      props.onConfirm?.();
    },
    onError() {
      toast({ type: "error", message: "Update failed" });
    },
  });

  const onSave = useCallback(
    (data) => {
      mutation.mutate(data);
      props.onConfirm?.();
    },
    [props, mutation]
  );

  return (
    <Modal {...props} title="Update tag" onConfirm={handleSubmit(onSave)}>
      <FormInput
        label="Tag name"
        error={errors?.name?.message}
        {...register("name", { required: "Tag name is required" })}
      />
    </Modal>
  );
};

export default UpdateTagModal;
