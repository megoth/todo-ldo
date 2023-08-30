import {createSubjectUrl, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {useForm} from "react-hook-form";
import useSubject from "@/hooks/useSubject";
import {todo} from "@/vocabularies";
import Button from "@/components/button";
import Loading from "@/components/loading";
import {useModal} from "react-modal-hook";
import FormModal from "@/components/form-modal";
import {FiPlusSquare} from "react-icons/fi";
import Input from "@/components/input";
import {List} from "@/ldo/todo.typings";
import {ListShapeType, TaskShapeType} from "@/ldo/todo.shapeTypes";
import {createLdoDataset, getDataset, startTransaction} from "ldo";

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
    } = useSubject<List>(listUrl, resourceUrl, ListShapeType);
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

    function onSubmit(list: List) {
        return handleSubmit(async (data) => {
            const dataset = createLdoDataset(getDataset(list));
            const task = dataset.usingType(TaskShapeType).fromSubject(createSubjectUrl(resourceUrl));

            // UPDATE TASK
            startTransaction(task);
            task.type = todo.Task;
            task.description = data.taskName;
            await update(task, resourceUrl, fetch);

            // UPDATE LIST
            startTransaction(list);
            list.task?.unshift(task);
            await update(list, resourceUrl, fetch);

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
        <Button onClick={showModal}>
            <span>Add task</span>
            <span className="icon"><FiPlusSquare/></span>
        </Button>
    )
}