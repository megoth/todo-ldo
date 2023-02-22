import useSubject from "@/hooks/useSubject";
import ErrorDetails from "@/components/errorDetails";
import Loading from "@/components/loading";
import {useEffect, useState} from "react";
import {useSession} from "@inrupt/solid-ui-react";
import {update} from "@/libs/ldo";
import {useForm} from "react-hook-form";
import {todo} from "@/vocabularies";
import styles from "./styles.module.css"
import Button from "@/components/button";
import Input from "@/components/input";
import {ListShape, TaskShape} from "@/ldo/todo.typings";
import {ListShapeFactory, TaskShapeFactory} from "@/ldo/todo.ldoFactory";
import CheckboxMark from "@/components/checkboxMark";
import {namedNode} from "@rdfjs/data-model";

interface TodoTaskProps {
    listUrl: string | undefined;
    taskUrl: string | undefined;
    resourceUrl: string | null | undefined;
}

interface FormData {
    done: boolean;
    description: string;
}

export default function TodoTask({listUrl, taskUrl, resourceUrl}: TodoTaskProps) {
    const {
        data: list,
        error: listError,
        isLoading: listIsLoading,
        mutate: mutateList
    } = useSubject<ListShape>(listUrl, resourceUrl, ListShapeFactory);
    const {
        data: task,
        error: taskError,
        isLoading: taskIsLoading,
        mutate: mutateTask
    } = useSubject<TaskShape>(taskUrl, resourceUrl, TaskShapeFactory);
    const {fetch} = useSession();
    const {
        reset, setValue, register, handleSubmit, control: {
            _formState: {
                isSubmitting
            },
            _formValues: {
                done
            }
        }
    } = useForm<FormData>({
        defaultValues: {
            description: task?.description,
            done: false,
        }
    });
    const [editMode, setEditMode] = useState<boolean>(false);
    const description = task?.description || "";
    useEffect(() => setValue("done", task?.status?.["@id"] === todo.completeValue), [task?.status])

    if (listError || taskError) {
        return <ErrorDetails error={listError || taskError}/>
    }

    if (!listUrl || !list || listIsLoading || !taskUrl || !task || taskIsLoading) {
        return <Loading/>
    }

    const onSubmit = handleSubmit(async (data, event) => {
        event?.preventDefault();
        task.description = data.description;
        await update(task, resourceUrl, fetch);
        await mutateTask(task.$clone());
        setEditMode(false);
    });

    const onReset = () => {
        reset({
            done: task?.status?.["@id"] === todo.completeValue,
        });
        setEditMode(false);
    };

    if (editMode && !isSubmitting) {
        return (
            <form className={styles.container} onSubmit={onSubmit} onReset={onReset}>
                <div className={styles.field}>
                    <Input defaultValue={description} {...register("description")}>Description</Input>
                </div>
                <div>
                    <Button variant="field">Save</Button>
                    <Button variant="field" type="reset">Cancel</Button>
                </div>
            </form>
        )
    }

    const onChange = handleSubmit(async (data, event) => {
        task.status = event?.target.checked ? todo.complete : todo.incomplete;
        await update(task, resourceUrl, fetch);
        await mutateTask(task.$clone());
    });

    const onRemove = async () => {
        const taskList = list.task!;
        const taskIndex = taskList.findIndex((t) => t["@id"] === task["@id"])
        task.$dataset().deleteMatches(namedNode(task["@id"]!));
        await update(task, resourceUrl, fetch);
        list.task = [
            ...taskList.slice(0, taskIndex),
            ...taskList.slice(taskIndex + 1)
        ];
        await update(list, resourceUrl, fetch);
        await mutateList(list.$clone());
    }

    return (
        <div className={styles.container}>
            <div className={styles.field}>
                <CheckboxMark disabled={isSubmitting} {...register("done")} onChange={onChange}>
                    <span style={{textDecoration: done ? "line-through" : "none"}}>{description}</span>
                </CheckboxMark>
            </div>
            {done && <Button type={"button"} variant={"link"} onClick={onRemove}>Remove</Button>}
            {!done && <Button variant={"link"} onClick={() => setEditMode(!editMode)}>Change</Button>}
        </div>
    )
}