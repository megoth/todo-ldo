import useSubject from "@/hooks/useSubject";
import {TodoTaskShape} from "@/ldo/todoTask.typings";
import {TodoTaskShapeFactory} from "@/ldo/todoTask.ldoFactory";
import ErrorDetails from "@/components/errorDetails";
import Loading from "@/components/loading";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import EditModeContext from "@/contexts/editMode";
import {useSession} from "@inrupt/solid-ui-react";
import {hasChanges, update} from "@/libs/ldo";

interface TodoTaskProps {
    taskUrl: string | undefined | null;
}

export default function TodoTask({taskUrl}: TodoTaskProps) {
    const {data: task, error: taskError, isLoading, mutate} = useSubject<TodoTaskShape>(taskUrl, TodoTaskShapeFactory);
    const {editMode, updating, setUpdating} = useContext(EditModeContext);
    const {fetch} = useSession();
    const [description, setDescription] = useState<string>(task?.taskDescription || "");
    const [done, setDone] = useState<boolean>(task?.taskDone || false)

    useEffect(() => {
        setDescription(task?.taskDescription || "");
        setDone(!!task?.taskDone);
    }, [task, task?.taskDescription, task?.taskDone]);

    useEffect(() => {
        if (!task || !hasChanges(task)) {
            return;
        }
        (async () => {
            setUpdating(true);
            await update(task, fetch);
            await mutate(task.$clone());
            setUpdating(false);
        })();
    }, [editMode, task, task?.taskDone])

    if (taskError) {
        return <ErrorDetails error={taskError}/>
    }

    if (!taskUrl || !task || isLoading) {
        return <Loading/>
    }

    if (editMode) {
        return <input value={description} disabled={updating} onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
            task.taskDescription = event.target.value;
        }}/>
    }

    return (
        <label>
            <input type={"checkbox"} disabled={updating} checked={done} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setDone(event.target.checked);
                task.taskDone = event.target.checked;
            }}/>
            <span style={{
                textDecoration: done ? "line-through" : "none"
            }}>{description}</span>
        </label>
    )
}