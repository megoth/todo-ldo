import useSubject from "@/hooks/useSubject";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import TodoTask from "@/components/todoTask";
import {MouseEvent, useState} from "react";
import TodoListTitle from "@/components/todoList/title";
import {createSubjectUrl, getValue, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {LinkedDataObject} from "ldo";
import Button from "@/components/button";
import ContentGroup from "@/components/contentGroup";
import ButtonBar from "@/components/buttonBar";
import {ListShape, TaskShape} from "@/ldo/todo.typings";
import {ListShapeFactory, TaskShapeFactory} from "@/ldo/todo.ldoFactory";
import {todo} from "@/vocabularies";

interface TodoListProps {
    listUrl: string | undefined;
    resourceUrl: string | undefined;
}


export default function TodoList({listUrl, resourceUrl}: TodoListProps) {
    const {fetch} = useSession();
    const {
        data: list,
        error: listError,
        isLoading,
        mutate: mutateList
    } = useSubject<ListShape>(listUrl, resourceUrl, ListShapeFactory);
    const editTitleState = useState<boolean>(false)
    const [editTitle, setEditTitle] = editTitleState;

    if (listError) {
        return <ErrorDetails error={listError}/>
    }

    if (!list || isLoading) {
        return <Loading/>
    }

    const addTask = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const task = TaskShapeFactory.new(createSubjectUrl(resourceUrl)) as LinkedDataObject<TaskShape>;
        task.type = getValue(todo.Task.value)
        task.description = "A new task";
        await update(task, resourceUrl, fetch);
        list.task?.unshift(task);
        await update(list, resourceUrl, fetch);
        await mutateList(list.$clone());
    }

    return (
        <>
            <TodoListTitle editModeState={editTitleState} listUrl={listUrl} resourceUrl={resourceUrl}/>
            <ButtonBar>
                {!editTitle && <Button shadow={"full"} onClick={() => setEditTitle(true)}>Change name</Button>}
                <Button shadow={"full"} onClick={(event) => addTask(event as MouseEvent<HTMLButtonElement>)}>Add task</Button>
            </ButtonBar>
            <div>
                {list.task?.map((task) => (
                    <ContentGroup key={task["@id"]}>
                        <TodoTask taskUrl={task["@id"]} resourceUrl={resourceUrl}/>
                    </ContentGroup>
                ))}
            </div>
        </>
    )
}