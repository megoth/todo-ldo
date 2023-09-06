import FormModal from "@/components/formModal";
import {update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import {List} from "@/ldo/todo.typings";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import Loading from "@/components/loading";
import Input from "@/components/input";
import {ListShapeType} from "@/ldo/todo.shapeTypes";

interface Props {
    hideModal: () => void;
    listUrl: string | undefined;
    resourceUrl: string | null | undefined;
}

interface FormData {
    listName: string;
}

export default function TodoListNameButtonModal({hideModal, listUrl, resourceUrl}: Props) {
    const {fetch} = useSession();
    const {
        data: list,
        isLoading,
        mutate: mutateList
    } = useSubject<List>(listUrl, resourceUrl, ListShapeType);
    const {reset, setValue, register, handleSubmit} = useForm<FormData>({
        defaultValues: {
            listName: ""
        }
    });
    useEffect(() => setValue("listName", list?.name || ""), [list?.name]);

    function onSubmit(list: List) {
        return handleSubmit(async (data) => {
            await update(list, resourceUrl, fetch, (list) => {
                list.name = data.listName;
            });
            await mutateList();
            reset(data);
            hideModal();
        });
    }

    function onReset(list: List) {
        return () => {
            reset({
                listName: list.name || ""
            });
            hideModal();
        };
    }

    if (isLoading || !list) {
        return <Loading/>
    }

    return (
        <form onSubmit={onSubmit(list!)} onReset={onReset(list!)}>
            <FormModal hideModal={hideModal} title={"Change name"}>
                <Input {...register("listName")} autoFocus>List name</Input>
            </FormModal>
        </form>
    )
}