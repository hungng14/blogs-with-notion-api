import FormInput from "@/components/base/FormInput";
import Modal, { Props } from "@/components/base/Modal";
import { toast } from "@/components/base/toast/toast";
import httpClient from "@/libs/httpClient";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

const CreateTagModal = (props: Omit<Props, "title" | "children">) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm({ defaultValues: { name: "" } });

  const mutation = useMutation({
    mutationFn: (newTag) => {
      return httpClient.post("/api/admin/tags/add", newTag);
    },
    onSuccess() {
      toast({ type: "success", message: "Create successfully" });
      resetForm({ name: "" });
      props.onConfirm?.();
    },
    onError() {
      toast({ type: "error", message: "Create failed" });
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
    <Modal {...props} title="Create new tag" onConfirm={handleSubmit(onSave)}>
      <FormInput
        label="Tag name"
        error={errors?.name?.message}
        {...register("name", { required: "Tag name is required" })}
      />
    </Modal>
  );
};

export default CreateTagModal;
