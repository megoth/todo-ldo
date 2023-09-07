import React from "react";
import { createSubjectUrl, update } from "@/libs/ldo";
import { useSession } from "@inrupt/solid-ui-react";
import { useForm } from "react-hook-form";
import useSubject from "@/hooks/useSubject";
import { todo } from "@/vocabularies";
import Input from "@/components/input";
import Button from "@/components/button";
import Loading from "@/components/loading";
import ContentGroup from "@/components/contentGroup";
import ErrorDetails from "@/components/errorDetails";
import { Document } from "@/ldo/todo.typings";
import { DocumentShapeType, ListShapeType } from "@/ldo/todo.shapeTypes";
import { createLdoDataset, getDataset } from "ldo";

interface TodoListIndexCreateListProps {
  resourceUrl: string | null | undefined;
  editMode: boolean;
  onSubmitted: () => void;
}

interface FormData {
  listName: string;
}

export default function TodoListIndexCreateList({ resourceUrl, editMode, onSubmitted }: TodoListIndexCreateListProps) {
  const {
    data: storage,
    error: storageError,
    isLoading: storageIsLoading,
    mutate: mutateStorage
  } = useSubject<Document>(resourceUrl, resourceUrl, DocumentShapeType);
  const { fetch } = useSession();
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      listName: "A new list"
    }
  });

  if (!editMode) {
    return null;
  }

  if (storageError) {
    return <ErrorDetails error={storageError} />;
  }

  if (!storage || storageIsLoading) {
    return <Loading />;
  }

  const onSubmit = handleSubmit(async (data) => {
    const dataset = createLdoDataset(getDataset(storage));
    const list = dataset.usingType(ListShapeType).fromSubject(createSubjectUrl(resourceUrl));
    await update(list, resourceUrl, fetch, (list) => {
      list.type = todo.List;
      list.name = data.listName;
    });
    await update(storage, resourceUrl, fetch, (storage) => {
      storage?.list?.unshift(list);
    });
    await mutateStorage();
    reset();
    onSubmitted();
  });

  const onReset = () => {
    reset();
    onSubmitted();
  };

  return (
    <ContentGroup>
      <form onSubmit={onSubmit} onReset={onReset}>
        <Input {...register("listName")} autoFocus>Name</Input>
        <Button>Create</Button>
        <Button type="reset">Cancel</Button>
      </form>
    </ContentGroup>
  );
}