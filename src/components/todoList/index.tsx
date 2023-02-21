import {TodoListShape} from "@/ldo/todoList.typings";
import useSubject from "@/hooks/useSubject";
import {TodoListShapeFactory} from "@/ldo/todoList.ldoFactory";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import TodoTask from "@/components/todoTask";
import {MouseEvent, useContext, useEffect} from "react";
import EditModeContext from "@/contexts/editMode";
import TodoListTitle from "@/components/todoList/title";
import {getValueAsString, hasChanges, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {LinkedDataObject} from "ldo";
import {TodoTaskShapeFactory} from "@/ldo/todoTask.ldoFactory";
import Button from "@/components/button";
import {v4 as uuidv4} from 'uuid';
import Center from "@/components/center";
import ContentGroup from "@/components/contentGroup";

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
    const {editMode, setEditMode, setUpdating} = useContext(EditModeContext);

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
    }, [editMode, list, resourceUrl, fetch, mutateList, setUpdating]);

    if (listError) {
        return <ErrorDetails error={listError}/>
    }

    if (!list || isLoading) {
        return <Loading/>
    }

    const addTask = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setUpdating(true);
        const task = TodoTaskShapeFactory.new(`#${uuidv4()}`);
        task.description = "A new task";
        await update(task, resourceUrl, fetch);
        list.task?.push(getValueAsString(task["@id"]!));
        await update(list, resourceUrl, fetch);
        await mutateList(list.$clone());
        setUpdating(false);
    }

    return (
        <>
            <TodoListTitle edit={editMode} listUrl={listUrl} resourceUrl={resourceUrl}/>
            <Center>
                <Button onClick={() => setEditMode(!editMode)}>{editMode ? "Save name" : "Change name"}</Button>
                <Button onClick={(event) => addTask(event as MouseEvent<HTMLButtonElement>)}>Add task</Button>
            </Center>
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