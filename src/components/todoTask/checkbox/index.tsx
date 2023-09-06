import Checkbox from "@/components/checkbox";
import {useForm} from "react-hook-form";
import {update} from "@/libs/ldo";
import {todo} from "@/vocabularies";
import useSubject from "@/hooks/useSubject";
import {Task} from "@/ldo/todo.typings";
import {TaskShapeType} from "@/ldo/todo.shapeTypes";
import Loading from "@/components/loading";
import {useSession} from "@inrupt/solid-ui-react";
import {useEffect} from "react";

interface Props {
    taskUrl: string | undefined;
    resourceUrl: string | null | undefined;
}

interface FormData {
    done: boolean;
    description: string;
}

export default function TodoTaskCheckbox({taskUrl, resourceUrl}: Props) {
    const {fetch} = useSession();
    const {
        data: task,
        mutate: mutateTask
    } = useSubject<Task>(taskUrl, resourceUrl, TaskShapeType);
    const {
        register,
        handleSubmit,
        control: {
            _formState: {
                isSubmitting
            },
            _formValues: {
                done
            }
        },
        setValue
    } = useForm<FormData>({
        defaultValues: {
            description: task?.description,
            done: false,
        }
    });
    useEffect(() => setValue("done", task?.status?.["@id"] === todo.completeValue), [task?.status])

    const onChange = handleSubmit(async (data, event) => {
        await update(task!, resourceUrl, fetch, (task) => {
            task.status = event?.target.checked ? todo.complete : todo.incomplete;
        });
        await mutateTask();
    });

    if (!task) {
        return <Loading />
    }

    return (
        <Checkbox disabled={isSubmitting} {...register("done")} onChange={onChange}>
            <span style={{textDecoration: done ? "line-through" : "none"}}>{task.description}</span>
        </Checkbox>
    )
}