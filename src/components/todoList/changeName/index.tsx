import Button from "@/components/button";
import {FiEdit2} from "react-icons/fi";
import {useModal} from "react-modal-hook";
import FormModal from "@/components/form-modal";
import {update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import {List} from "@/ldo/todo.typings";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import Loading from "@/components/loading";
import Input from "@/components/input";
import {ListShapeType} from "@/ldo/todo.shapeTypes";
import {startTransaction} from "ldo";

interface TodoListChangeNameProps {
    listUrl: string | undefined;
    resourceUrl: string | null | undefined;
}

interface FormData {
    listName: string;
}

export default function TodoListChangeName({listUrl, resourceUrl}: TodoListChangeNameProps) {
    const {fetch} = useSession();
    const {
        data: list,
        mutate: mutateList
    } = useSubject<List>(listUrl, resourceUrl, ListShapeType);
    const {reset, setValue, register, handleSubmit} = useForm<FormData>({
        defaultValues: {
            listName: ""
        }
    });
    useEffect(() => setValue("listName", list?.name || ""), [list?.name]);

    const [showModal, hideModal] = useModal(() => {
        return (
            <form onSubmit={onSubmit(list!)} onReset={onReset(list!)}>
                <FormModal hideModal={hideModal} title={"Change name"}>
                    <Input {...register("listName")} autoFocus>List name</Input>
                </FormModal>
            </form>
        );
    }, [list]);

    function close(data: FormData) {
        reset(data);
        hideModal();
    }

    function onSubmit(list: List) {
        return handleSubmit(async (data, event) => {
            event?.preventDefault();
            startTransaction(list);
            list.name = data.listName;
            await update(list, resourceUrl, fetch);
            await mutateList();
            close(data);
        });
    }

    function onReset(list: List) {
        return () => close({
            listName: list.name || ""
        });
    }

    if (!list) {
        return <Loading/>
    }

    return (
        <Button onClick={showModal}>
            <span>Change name</span>
            <span className="icon"><FiEdit2/></span>
        </Button>
    )
}