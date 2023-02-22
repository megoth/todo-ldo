import useSubject from "@/hooks/useSubject";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import TodoTask from "@/components/todoTask";
import {useEffect, useState} from "react";
import TodoListTitle from "@/components/todoList/title";
import Button from "@/components/button";
import ContentGroup from "@/components/contentGroup";
import {ListShape} from "@/ldo/todo.typings";
import {ListShapeFactory} from "@/ldo/todo.ldoFactory";
import TodoListCreateTask from "@/components/todoList/createTask";
import {FiEdit2, FiPlusSquare} from "react-icons/fi";
import FlexBar from "@/components/flexBar";
import useLocalStorage from "use-local-storage";

interface TodoListProps {
    listUrl: string | undefined;
    resourceUrl: string | null | undefined;
}


export default function TodoList({listUrl, resourceUrl}: TodoListProps) {
    const {
        data: list,
        error: listError,
        isLoading,
    } = useSubject<ListShape>(listUrl, resourceUrl, ListShapeFactory);
    const [_, setPreferredList] = useLocalStorage<string>("preferredList", listUrl!);
    const [editTitle, setEditTitle] = useState<boolean>(false);
    const [createTask, setCreateTask] = useState<boolean>(false);
    useEffect(() => {
        if (!listUrl) {
            return;
        }
        setPreferredList(listUrl)
    }, [listUrl, setPreferredList])

    if (listError) {
        return <ErrorDetails error={listError}/>
    }

    if (!list || isLoading) {
        return <Loading/>
    }

    return (
        <>
            <TodoListTitle listUrl={listUrl} resourceUrl={resourceUrl} editMode={editTitle} onSubmitted={() => setEditTitle(false)}/>
            <FlexBar>
                {!editTitle && (
                    <Button shadow={"full"} onClick={() => setEditTitle(true)}>
                        <span>Change name</span>
                        <FiEdit2/>
                    </Button>
                )}
                {!createTask && (
                    <Button shadow={"full"} onClick={() => setCreateTask(true)}>
                        <span>Add task</span>
                        <FiPlusSquare/>
                    </Button>
                )}
            </FlexBar>
            <TodoListCreateTask listUrl={listUrl} resourceUrl={resourceUrl} editMode={createTask} onSubmitted={() => setCreateTask(false)}/>
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