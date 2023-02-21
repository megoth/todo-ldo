import useSubject from "@/hooks/useSubject";
import {TodoTaskShape} from "@/ldo/todoTask.typings";
import {TodoTaskShapeFactory} from "@/ldo/todoTask.ldoFactory";
import ErrorDetails from "@/components/errorDetails";
import Loading from "@/components/loading";
import {useState} from "react";
import {useSession} from "@inrupt/solid-ui-react";
import {getValueAsString, update} from "@/libs/ldo";
import {useForm} from "react-hook-form";
import {todo} from "@/vocabularies";
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
    } = useSubject<TodoTaskShape>(taskUrl, resourceUrl, TodoTaskShapeFactory);
    const {fetch} = useSession();
    const {register, handleSubmit} = useForm<FormData>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(false);
    const description = task?.description || "";
    const done = task?.status === todo.complete.value || false;

    if (taskError) {
        return <ErrorDetails error={taskError}/>
    }

    if (!taskUrl || !task || isLoading) {
        return <Loading/>
    }

    const onSubmit = handleSubmit(async (data, event) => {
        event?.preventDefault();
        setUpdating(true);
        task.description = data.description;
        task.status = getValueAsString((data.done ? todo.complete : todo.incomplete).value);
        await update(task, resourceUrl, fetch);
        await mutateTask(task.$clone());
        setUpdating(false);
        setEditMode(false);
    });

    if (editMode) {
        return (
            <form onSubmit={onSubmit}>
                <input defaultValue={description} disabled={updating} {...register("description")}/>
            </form>
        )
    }

    return (
        <form onSubmit={onSubmit}>
            <CheckboxMark {...register("done")}>
                <span style={{textDecoration: done ? "line-through" : "none"}}>
                    {description}
                </span>
            </CheckboxMark>
        </form>
    )
}