import React from "react";
import Button from "@/components/button";
import {FiDelete} from "react-icons/fi";
import {remove, update} from "@/libs/ldo";
import useSubject from "@/hooks/useSubject";
import {List, Task} from "@/ldo/todo.typings";
import {ListShapeType, TaskShapeType} from "@/ldo/todo.shapeTypes";
import {useSession} from "@inrupt/solid-ui-react";
import ErrorDetails from "@/components/errorDetails";
import Loading from "@/components/loading";

interface Props {
    listUrl: string | undefined;
    taskUrl: string | undefined;
    resourceUrl: string | null | undefined;
}

export default function TodoTaskDeleteButton({listUrl, taskUrl, resourceUrl}: Props) {
    const {fetch} = useSession();
    const {
        data: list,
        error: listError,
        isLoading: listIsLoading,
        mutate: mutateList
    } = useSubject<List>(listUrl, resourceUrl, ListShapeType);
    const {
        data: task,
        error: taskError,
        isLoading: taskIsLoading,
    } = useSubject<Task>(taskUrl, resourceUrl, TaskShapeType);

    if (listError || taskError) {
        return <ErrorDetails error={listError || taskError}/>
    }

    if (!listUrl || !list || listIsLoading || !taskUrl || !task || taskIsLoading) {
        return <Loading/>
    }

    const onRemove = async () => {
        const tasks = list.task!;
        const taskIndex = tasks.findIndex((t) => t["@id"] === task["@id"])
        // First removing task itself
        await remove(task, resourceUrl, fetch);
        // Then removing task from list
        await update(list, resourceUrl, fetch, (list) => {
            list.task = [
                ...tasks.slice(0, taskIndex),
                ...tasks.slice(taskIndex + 1)
            ];
        });
        // Clean up
        await mutateList();
    }

    return (
        <Button variant="danger" onClick={onRemove}>
            <span>Remove</span>
            <span className="icon"><FiDelete/></span>
        </Button>
    )
}