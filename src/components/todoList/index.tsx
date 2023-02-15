import {TodoListShape} from "@/ldo/todoList.typings";
import useSubject from "@/hooks/useSubject";
import {TodoListShapeFactory} from "@/ldo/todoList.ldoFactory";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import TodoTask from "@/components/todoTask";
import {FormEvent, MouseEvent, useContext, useEffect, useState} from "react";
import EditModeContext from "@/contexts/editMode";
import TodoListTitle from "@/components/todoList/title";
import {hasChanges, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {LinkedDataObject} from "ldo";
import {TodoTaskShapeFactory} from "@/ldo/todoTask.ldoFactory";

interface TodoListProps {
    listUrl: string;
    resourceUrl: string;
}


export default function TodoList({listUrl, resourceUrl}: TodoListProps) {
    const {data: list, error: listError, isLoading, mutate: mutateList} = useSubject<TodoListShape>(listUrl, resourceUrl, TodoListShapeFactory);
    const {editMode, setEditMode, setUpdating} = useContext(EditModeContext);
    const {fetch} = useSession();

    useEffect(() => {
        if (!list || (editMode || (!editMode && !hasChanges(list)))) {
            return;
        }
        (async () => {
            setUpdating(true);
            await update(list, resourceUrl, fetch);
            await mutateList(list.$clone());
            setUpdating(false);
        })();
    }, [editMode, list]);

    if (listError) {
        return <ErrorDetails error={listError}/>
    }

    if (!list || isLoading) {
        return <Loading/>
    }

    const toggleEditMode = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEditMode(!editMode);
    }

    const addTask = (event: MouseEvent<HTMLButtonElement>) => {
        // TODO: WORK IN PROGRESS
        event.preventDefault();
        const task = TodoTaskShapeFactory.new();
        // list.task?.push(task["@id"]!);
        console.log(task["@id"]);
    }

    return (
        <form onSubmit={toggleEditMode}>
            <TodoListTitle list={list}/>
            <button>{editMode ? "Close edit mode" : "Toggle edit mode"}</button>
            <ul>
                {list.task?.map((task: LinkedDataObject<any>, index) => (
                    <li key={task["@id"]}>
                        <TodoTask taskUrl={task["@id"]} resourceUrl={resourceUrl}/>
                    </li>
                ))}
            </ul>
            <button type={"button"} onClick={addTask}>Add task</button>
        </form>
    )
}