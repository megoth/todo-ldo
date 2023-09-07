import React from "react";
import {createSubjectUrl, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {useForm} from "react-hook-form";
import useSubject from "@/hooks/useSubject";
import {todo} from "@/vocabularies";
import Loading from "@/components/loading";
import FormModal from "@/components/formModal";
import Input from "@/components/input";
import {List} from "@/ldo/todo.typings";
import {ListShapeType, TaskShapeType} from "@/ldo/todo.shapeTypes";
import {createLdoDataset, getDataset} from "ldo";

interface Props {
    hideModal: () => void;
    listUrl: string | null | undefined;
    resourceUrl: string | null | undefined;
}

interface FormData {
    taskName: string;
}

export default function TodoTaskCreateButtonModal({hideModal, listUrl, resourceUrl}: Props) {
    const {fetch} = useSession();
    const {register, handleSubmit, reset} = useForm<FormData>({
        defaultValues: {
            taskName: "A new task"
        }
    });
    const {
        data: list,
        mutate: mutateList
    } = useSubject<List>(listUrl, resourceUrl, ListShapeType);

    if (!list) {
        return <Loading/>
    }

    function onSubmit(list: List) {
        return handleSubmit(async (data) => {
            const dataset = createLdoDataset(getDataset(list));
            const task = dataset.usingType(TaskShapeType).fromSubject(createSubjectUrl(resourceUrl));

            // UPDATE TASK
            await update(task, resourceUrl, fetch, (task) => {
                task.type = todo.Task;
                task.description = data.taskName;
            });

            // UPDATE LIST
            await update(list, resourceUrl, fetch, (list) => {
                list.task?.unshift(task);
            });

            // CLEAN UP
            await mutateList();
            reset();
            hideModal();
        })
    }

    function onReset() {
        reset();
        hideModal();
    }

    return (
        <form onSubmit={onSubmit(list!)} onReset={onReset}>
            <FormModal hideModal={hideModal} title={"Create task"}>
                <Input {...register("taskName")} autoFocus>Task description</Input>
            </FormModal>
        </form>
    )
}