import {createSubjectUrl, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {useForm} from "react-hook-form";
import useSubject from "@/hooks/useSubject";
import {ListShape, TaskShape} from "@/ldo/todo.typings";
import {ListShapeFactory, TaskShapeFactory} from "@/ldo/todo.ldoFactory";
import {LinkedDataObject} from "ldo";
import {todo} from "@/vocabularies";
import Button from "@/components/button";
import Loading from "@/components/loading";
import {useModal} from "react-modal-hook";
import FormModal from "@/components/form-modal";
import {FiPlusSquare} from "react-icons/fi";
import Input from "@/components/input";

interface TodoListCreateTaskProps {
    listUrl: string | null | undefined;
    resourceUrl: string | null | undefined;
}

interface FormData {
    taskName: string;
}

export default function TodoListCreateTask({listUrl, resourceUrl}: TodoListCreateTaskProps) {
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
    const [showModal, hideModal] = useModal(() => {
        return (
            <form onSubmit={onSubmit(list!)} onReset={onReset}>
                <FormModal hideModal={hideModal} title={"Create task"}>
                    <Input {...register("taskName")} autoFocus>Task description</Input>
                </FormModal>
            </form>
        );
    }, [list]);

    if (!list) {
        return <Loading/>
    }

    function onSubmit(list: LinkedDataObject<ListShape>) {
        return handleSubmit(async (data) => {
            const task = TaskShapeFactory.new(createSubjectUrl(resourceUrl)) as LinkedDataObject<TaskShape>;
            task.type = todo.Task;
            task.description = data.taskName;
            await update(task, resourceUrl, fetch);
            list.task?.unshift(task);
            await update(list, resourceUrl, fetch);
            await mutateList(list.$clone());
            reset();
            hideModal();
        })
    }

    function onReset() {
        reset();
        hideModal();
    }

    return (
        <Button onClick={showModal}>
            <span>Add task</span>
            <span className="icon"><FiPlusSquare/></span>
        </Button>
    )
}