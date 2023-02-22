import useSubject from "@/hooks/useSubject";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import TodoTask from "@/components/todoTask";
import {useState} from "react";
import TodoListTitle from "@/components/todoList/title";
import Button from "@/components/button";
import ContentGroup from "@/components/contentGroup";
import ButtonBar from "@/components/buttonBar";
import {ListShape} from "@/ldo/todo.typings";
import {ListShapeFactory} from "@/ldo/todo.ldoFactory";
import TodoListCreateTask from "@/components/todoList/createTask";

interface TodoListProps {
    listUrl: string | undefined;
    resourceUrl: string | undefined;
}


export default function TodoList({listUrl, resourceUrl}: TodoListProps) {
    const {
        data: list,
        error: listError,
        isLoading,
    } = useSubject<ListShape>(listUrl, resourceUrl, ListShapeFactory);
    const editTitleState = useState<boolean>(false)
    const [editTitle, setEditTitle] = editTitleState;
    const createTaskState = useState<boolean>(false);
    const [createTask, setCreateTask] = createTaskState;

    if (listError) {
        return <ErrorDetails error={listError}/>
    }

    if (!list || isLoading) {
        return <Loading/>
    }

    return (
        <>
            <TodoListTitle editModeState={editTitleState} listUrl={listUrl} resourceUrl={resourceUrl}/>
            <ButtonBar>
                {!editTitle && <Button shadow={"full"} onClick={() => setEditTitle(true)}>Change name</Button>}
                {!createTask && <Button shadow={"full"} onClick={() => setCreateTask(true)}>Add task</Button>}
            </ButtonBar>
            <TodoListCreateTask listUrl={listUrl} resourceUrl={resourceUrl} createTaskState={createTaskState}/>
            <div>
                {list.task?.map((task) => (
                    <ContentGroup key={task["@id"]}>
                        <TodoTask listUrl={list["@id"]} taskUrl={task["@id"]} resourceUrl={resourceUrl}/>
                    </ContentGroup>
                ))}
            </div>
        </>
    )
}