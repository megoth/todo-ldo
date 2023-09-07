import React from "react";
import useSubject from "@/hooks/useSubject";
import ErrorDetails from "@/components/errorDetails";
import Loading from "@/components/loading";
import { Task } from "@/ldo/todo.typings";
import { TaskShapeType } from "@/ldo/todo.shapeTypes";
import TodoTaskDescriptionButton from "src/components/todoTaskDescriptionButton";
import TodoTaskCheckbox from "@/components/todoTask/checkbox";
import { todo } from "@/vocabularies";
import TodoTaskDeleteButton from "@/components/todoTaskDeleteButton";

interface Props {
  listUrl: string | undefined;
  taskUrl: string | undefined;
  resourceUrl: string | null | undefined;
}

export default function TodoTask({ listUrl, taskUrl, resourceUrl }: Props) {
  const {
    data: task,
    isLoading,
    error
  } = useSubject<Task>(taskUrl, resourceUrl, TaskShapeType);

  if (error) {
    return <ErrorDetails error={error} />;
  }

  if (!task || isLoading) {
    return <Loading />;
  }

  return (
    <div className="list-item">
      <div className="list-item-content">
        <TodoTaskCheckbox taskUrl={taskUrl} resourceUrl={resourceUrl} />
      </div>
      <div className="list-item-controls">
        {task.status?.["@id"] === todo.completeValue && (
          <TodoTaskDeleteButton listUrl={listUrl} taskUrl={taskUrl} resourceUrl={resourceUrl} />
        )}
        {task.status?.["@id"] !== todo.completeValue && (
          <TodoTaskDescriptionButton taskUrl={taskUrl} resourceUrl={resourceUrl} />
        )}
      </div>
    </div>
  );
}