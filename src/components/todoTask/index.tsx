import useSubject from "@/hooks/useSubject";
import {TaskShape} from "@/ldo/todoTask.typings";
import {TaskShapeFactory} from "@/ldo/todoTask.ldoFactory";
import ErrorDetails from "@/components/errorDetails";
import Loading from "@/components/loading";
import {MouseEvent, useState} from "react";
import {useSession} from "@inrupt/solid-ui-react";
import {getValue, update} from "@/libs/ldo";
import {useForm} from "react-hook-form";
import {todo} from "@/vocabularies";
import CheckboxMark from "@/components/checkboxMark";
import styles from "./styles.module.css"
import Button from "@/components/button";
import Input from "@/components/input";

interface TodoTaskProps {
    taskUrl: string;
    resourceUrl: string;
}

interface FormData {
    done: boolean;
    description: string;
}

export default function TodoTask({taskUrl, resourceUrl}: TodoTaskProps) {
    const {
        data: task,
        error: taskError,
        isLoading,
        mutate: mutateTask
    } = useSubject<TaskShape>(taskUrl, resourceUrl, TaskShapeFactory);
    const {fetch} = useSession();
    const {register, handleSubmit} = useForm<FormData>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const description = task?.description || "";
    const [done, setDone] = useState<boolean>(task?.status?.["@id"] === todo.complete.value);

    if (taskError) {
        return <ErrorDetails error={taskError}/>
    }

    if (!taskUrl || !task || isLoading) {
        return <Loading/>
    }

    const onSubmit = handleSubmit(async (data, event) => {
        event?.preventDefault();
        task.description = data.description;
        await update(task, resourceUrl, fetch);
        await mutateTask(task.$clone());
        setEditMode(false);
    });

    if (editMode) {
        return (
            <form className={styles.container} onSubmit={onSubmit}>
                <div className={styles.field}>
                    <Input defaultValue={description} {...register("description")}>Description</Input>
                </div>
                <Button variant={"field"} onClick={() => setEditMode(!editMode)}>Save</Button>
            </form>
        )
    }

    const onChange = async (event: MouseEvent<HTMLInputElement>) => {
        const checked = (event.target as HTMLInputElement).checked;
        setDone(checked);
        task.status = getValue((checked ? todo.complete : todo.incomplete).value);
        await update(task, resourceUrl, fetch);
        await mutateTask(task.$clone());
    }

    return (
        <div className={styles.container}>
            <div className={styles.field}>
                <CheckboxMark defaultChecked={done} {...register("done")} onChange={onChange}>
                    <span style={{textDecoration: done ? "line-through" : "none"}}>{description}</span>
                </CheckboxMark>
            </div>
            {done && <Button variant={"field"}>Remove</Button>}
            {!done && <Button variant={"field"} onClick={() => setEditMode(!editMode)}>Change</Button>}
        </div>
    )
}