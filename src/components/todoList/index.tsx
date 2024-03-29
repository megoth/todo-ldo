import React from "react";
import useSubject from "@/hooks/useSubject";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import TodoTask from "@/components/todoTask";
import FlexBar from "@/components/flexBar";
import {List} from "@/ldo/todo.typings";
import {ListShapeType} from "@/ldo/todo.shapeTypes";
import TodoListNameButton from "src/components/todoListNameButton";
import TodoTaskCreateButton from "src/components/todoTaskCreateButton";

interface TodoListProps {
    listUrl: string | undefined;
    resourceUrl: string | null | undefined;
}


export default function TodoList({listUrl, resourceUrl}: TodoListProps) {
    const {
        data: list,
        error: listError,
        isLoading,
    } = useSubject<List>(listUrl, resourceUrl, ListShapeType);

    if (listError) {
        return <ErrorDetails error={listError}/>
    }

    if (!list || isLoading) {
        return <Loading/>
    }

    return (
        <>
            <h1 className="title">{list.name}</h1>
            <FlexBar>
                <TodoListNameButton listUrl={listUrl} resourceUrl={resourceUrl}/>
                <TodoTaskCreateButton listUrl={listUrl} resourceUrl={resourceUrl} />
            </FlexBar>
            <ul className="list has-visible-pointer-controls">
                {list.task?.map((task) => (
                    <TodoTask key={task["@id"]} listUrl={list["@id"]} taskUrl={task["@id"]} resourceUrl={resourceUrl}/>
                ))}
            </ul>
        </>
    )
}