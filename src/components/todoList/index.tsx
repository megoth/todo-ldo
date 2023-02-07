import {TodoListShape} from "@/ldo/todoList.typings";
import useSubject from "@/hooks/useSubject";
import {TodoListShapeFactory} from "@/ldo/todoList.ldoFactory";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import TodoTask from "@/components/todoTask";
import {FormEvent, useContext, useEffect, useState} from "react";
import EditModeContext from "@/contexts/editMode";
import TodoListTitle from "@/components/todoList/title";
import {hasChanges, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {LinkedDataObject} from "ldo";
import Code from "@/components/code";

interface TodoListProps {
    listUrl: string | null;
}


export default function TodoList({listUrl}: TodoListProps) {
    const {data: list, error: listError, isLoading, mutate} = useSubject<TodoListShape>(listUrl, TodoListShapeFactory);
    const {editMode, setEditMode, setUpdating} = useContext(EditModeContext);
    const {fetch} = useSession();

    useEffect(() => {
        if (!list || (editMode || (!editMode && !hasChanges(list)))) {
            return;
        }
        (async () => {
            setUpdating(true);
            await update(list, fetch);
            await mutate(list.$clone());
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

    return (
        <form onSubmit={toggleEditMode}>
            <TodoListTitle list={list}/>
            <button>{editMode ? "Close edit mode" : "Toggle edit mode"}</button>
            <ul>
                {list.hasTask?.map((task: LinkedDataObject<any>, index) => (
                    <li key={task["@id"]}>
                        <TodoTask taskUrl={task["@id"]}/>
                    </li>
                ))}
            </ul>
        </form>
    )
}