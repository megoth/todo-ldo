import React from "react";
import FormModal from "@/components/formModal";
import {update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import {Task} from "@/ldo/todo.typings";
import {useForm} from "react-hook-form";
import Loading from "@/components/loading";
import Input from "@/components/input";
import {TaskShapeType} from "@/ldo/todo.shapeTypes";
import {todo} from "@/vocabularies";

interface Props {
    hideModal: () => void;
    taskUrl: string | undefined;
    resourceUrl: string | null | undefined;
}

interface FormData {
    description: string;
    done: boolean;
}

export default function TodoTaskDescriptionButtonModal({hideModal, taskUrl, resourceUrl}: Props) {
    const {fetch} = useSession();
    const {
        data: task,
        isLoading,
        mutate: mutateTask
    } = useSubject<Task>(taskUrl, resourceUrl, TaskShapeType);
    const {
        reset,
        register,
        handleSubmit,
    } = useForm<FormData>({
        defaultValues: {
            description: task?.description,
            done: false,
        }
    });


    const onSubmit = handleSubmit(async (form, event) => {
        event?.preventDefault();

        // UPDATE TASK
        await update(task!, resourceUrl, fetch, (task) => {
            task.description = form.description;
        });

        // CLEAN UP
        await mutateTask();
        hideModal();
    });

    const onReset = () => {
        reset({
            done: task?.status?.["@id"] === todo.completeValue,
        });
        hideModal();
    };

    if (isLoading || !task) {
        return <Loading/>
    }

    return (
        <form onSubmit={onSubmit} onReset={onReset}>
            <FormModal hideModal={hideModal} title={"Change description"}>
                <Input defaultValue={task.description} {...register("description")}>Description</Input>
            </FormModal>
        </form>
    )
}