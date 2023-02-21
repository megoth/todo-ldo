import {TodoListShape} from "@/ldo/todoList.typings";
import useSubject from "@/hooks/useSubject";
import {TodoListShapeFactory} from "@/ldo/todoList.ldoFactory";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import TodoTask from "@/components/todoTask";
import {MouseEvent, useState} from "react";
import TodoListTitle from "@/components/todoList/title";
import {getValueAsString, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {LinkedDataObject} from "ldo";
import {TodoTaskShapeFactory} from "@/ldo/todoTask.ldoFactory";
import Button from "@/components/button";
import {v4 as uuidv4} from 'uuid';
import ContentGroup from "@/components/contentGroup";
import ButtonBar from "@/components/buttonBar";

interface TodoListProps {
    listUrl: string;
    resourceUrl: string;
}


export default function TodoList({listUrl, resourceUrl}: TodoListProps) {
    const {fetch} = useSession();
    const {
        data: list,
        error: listError,
        isLoading,
        mutate: mutateList
    } = useSubject<TodoListShape>(listUrl, resourceUrl, TodoListShapeFactory);

    if (listError) {
        return <ErrorDetails error={listError}/>
    }

    if (!list || isLoading) {
        return <Loading/>
    }

    const addTask = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const task = TodoTaskShapeFactory.new(`#${uuidv4()}`);
        task.description = "A new task";
        await update(task, resourceUrl, fetch);
        list.task?.push(getValueAsString(task["@id"]!));
        await update(list, resourceUrl, fetch);
        await mutateList(list.$clone());
    }

    return (
        <>
            <TodoListTitle listUrl={listUrl} resourceUrl={resourceUrl}/>
            <ButtonBar>
                <Button onClick={(event) => addTask(event as MouseEvent<HTMLButtonElement>)}>Add task</Button>
            </ButtonBar>
            <div>
                {list.task?.map((task: LinkedDataObject<any>) => (
                    <ContentGroup key={task["@id"]}>
                        <TodoTask taskUrl={task["@id"]} resourceUrl={resourceUrl}/>
                    </ContentGroup>
                ))}
            </div>
        </>
    )
}