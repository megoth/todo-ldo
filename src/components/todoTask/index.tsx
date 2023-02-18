import useSubject from "@/hooks/useSubject";
import {TodoTaskShape} from "@/ldo/todoTask.typings";
import {TodoTaskShapeFactory} from "@/ldo/todoTask.ldoFactory";
import ErrorDetails from "@/components/errorDetails";
import Loading from "@/components/loading";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import EditModeContext from "@/contexts/editMode";
import {useSession} from "@inrupt/solid-ui-react";
import {hasChanges, update} from "@/libs/ldo";
import {todoTaskContext} from "@/ldo/todoTask.context";

interface TodoTaskProps {
    taskUrl: string;
    resourceUrl: string;
}

export default function TodoTask({taskUrl, resourceUrl}: TodoTaskProps) {
    const {complete, incomplete } = todoTaskContext;
    const {
        data: task,
        error: taskError,
        isLoading,
        mutate: mutateTask
    } = useSubject<TodoTaskShape>(taskUrl, resourceUrl, TodoTaskShapeFactory);
    const {editMode, updating, setUpdating} = useContext(EditModeContext);
    const {fetch} = useSession();
    const [description, setDescription] = useState<string>(task?.description || "");
    const [done, setDone] = useState<boolean>(task?.status === incomplete || false)

    useEffect(() => {
        setDescription(task?.description || "");
        setDone(task?.status === complete);
    }, [task, task?.description, task?.status]);

    useEffect(() => {
        if (!task || !hasChanges(task)) {
            return;
        }
        (async () => {
            setUpdating(true);
            await update(task, resourceUrl, fetch);
            await mutateTask(task.$clone());
            setUpdating(false);
        })();
    }, [editMode, task, task?.status, setUpdating, mutateTask, resourceUrl, fetch])

    if (taskError) {
        return <ErrorDetails error={taskError}/>
    }

    if (!taskUrl || !task || isLoading) {
        return <Loading/>
    }

    if (editMode) {
        return <input value={description} disabled={updating} onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
            task.description = event.target.value;
        }}/>
    }

    return (
        <label>
            <input type={"checkbox"} disabled={updating} checked={done}
                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                       setDone(event.target.checked);
                       // TODO: FIX STATUS
                       // task.status = event.target.checked ? complete : incomplete;
                   }}/>
            <span style={{
                textDecoration: done ? "line-through" : "none"
            }}>{description}</span>
        </label>
    )
}