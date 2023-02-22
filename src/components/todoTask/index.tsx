import useSubject from "@/hooks/useSubject";
import ErrorDetails from "@/components/errorDetails";
import Loading from "@/components/loading";
import {useEffect, useState} from "react";
import {useSession} from "@inrupt/solid-ui-react";
import {getValue, update} from "@/libs/ldo";
import {useForm} from "react-hook-form";
import {todo} from "@/vocabularies";
import styles from "./styles.module.css"
import Button from "@/components/button";
import Input from "@/components/input";
import {TaskShape} from "@/ldo/todo.typings";
import {TaskShapeFactory} from "@/ldo/todo.ldoFactory";
import CheckboxMark from "@/components/checkboxMark";

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
    const {setValue, register, handleSubmit, control: {
        _formState: {
            isSubmitting
        },
        _formValues: {
            done
        }
    }} = useForm<FormData>({
        defaultValues: {
            description: task?.description,
            done: false,
        }
    });
    const [editMode, setEditMode] = useState<boolean>(false);
    const description = task?.description || "";
    useEffect(() => setValue("done", task?.status?.["@id"] === todo.complete), [task?.status])

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
                    <Input disabled={isSubmitting} defaultValue={description} {...register("description")}>Description</Input>
                </div>
                <div>
                    <Button variant={"field"}>Save</Button>
                </div>
            </form>
        )
    }

    const onChange = handleSubmit(async (data, event) => {
        task.status = getValue(event?.target.checked ? todo.complete : todo.incomplete);
        await update(task, resourceUrl, fetch);
        await mutateTask(task.$clone());
    });

    return (
        <div className={styles.container}>
            <div className={styles.field}>
                <CheckboxMark disabled={isSubmitting} {...register("done")} onChange={onChange}>
                    <span style={{textDecoration: done ? "line-through" : "none"}}>{description}</span>
                </CheckboxMark>
            </div>
            {done && <Button variant={"link"}>Remove</Button>}
            {!done && <Button variant={"link"} onClick={() => setEditMode(!editMode)}>Change</Button>}
        </div>
    )
}