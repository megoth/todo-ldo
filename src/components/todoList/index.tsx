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
import {NOT_FOUND} from "@/libs/httpStatus";

interface TodoListProps {
    listUrl: string | null;
}


export default function TodoList({listUrl}: TodoListProps) {
    const {data, error: listError, isLoading, mutate} = useSubject<TodoListShape>(listUrl, TodoListShapeFactory);
    const [list, setList] = useState<LinkedDataObject<TodoListShape> | undefined>(data);
    const {editMode, setEditMode, setUpdating} = useContext(EditModeContext);
    const {fetch} = useSession();
    const [turtle, setTurtle] = useState<string>();

    useEffect(() => {
        if (!data || !listUrl) {
            return;
        }
        (async () => {
            if (listError?.status === NOT_FOUND) {
                setList(TodoListShapeFactory.new(listUrl));
                setTurtle("");
                return;
            }
            setList(data);
            setTurtle(await data?.$toTurtle());
        })();
    }, [listUrl, data, listError])

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

    if (listError && listError.status !== NOT_FOUND) {
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
                {list.task?.map((task: LinkedDataObject<any>, index) => (
                    <li key={task["@id"]}>
                        <TodoTask taskUrl={task["@id"]}/>
                    </li>
                ))}
            </ul>
            <h2>Turtle fetched from Pod</h2>
            <Code>{turtle}</Code>
        </form>
    )
}