import {Dispatch, SetStateAction} from "react";
import {createSubjectUrl, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {useForm} from "react-hook-form";
import useSubject from "@/hooks/useSubject";
import {ListShape, TaskShape} from "@/ldo/todo.typings";
import {ListShapeFactory, TaskShapeFactory} from "@/ldo/todo.ldoFactory";
import {LinkedDataObject} from "ldo";
import {todo} from "@/vocabularies";
import styles from "@/components/todoList/title/styles.module.css";
import Input from "@/components/input";
import Button from "@/components/button";
import Loading from "@/components/loading";
import ContentGroup from "@/components/contentGroup";

interface TodoListCreateTaskProps {
    listUrl: string | undefined;
    resourceUrl: string | null | undefined;
    editMode: boolean;
    onSubmitted: () => void;
}

interface FormData {
    taskName: string;
}

export default function TodoListCreateTask({listUrl, editMode, resourceUrl, onSubmitted}: TodoListCreateTaskProps) {
    const {fetch} = useSession();
    const {register, handleSubmit, reset} = useForm<FormData>({
        defaultValues: {
            taskName: "A new task"
        }
    });
    const {
        data: list,
        mutate: mutateList
    } = useSubject<ListShape>(listUrl, resourceUrl, ListShapeFactory);

    if (!editMode) {
        return null;
    }

    if (!list) {
        return <Loading/>
    }

    const onSubmit = handleSubmit(async (data, event) => {
        const task = TaskShapeFactory.new(createSubjectUrl(resourceUrl)) as LinkedDataObject<TaskShape>;
        task.type = todo.Task;
        task.description = data.taskName;
        await update(task, resourceUrl, fetch);
        list.task?.unshift(task);
        await update(list, resourceUrl, fetch);
        await mutateList(list.$clone());
        reset();
        onSubmitted();
    });

    const onReset = () => {
        reset();
        onSubmitted();
    }

    return (
        <ContentGroup>
            <form className={styles.container} onSubmit={onSubmit} onReset={onReset}>
                <Input className={styles.field} {...register("taskName")} autoFocus>Name</Input>
                <Button variant="field">Create</Button>
                <Button variant="field" type="reset">Cancel</Button>
            </form>
        </ContentGroup>
    )
}