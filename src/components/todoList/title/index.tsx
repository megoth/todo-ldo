import {TodoListShape} from "@/ldo/todoList.typings";
import Input from "@/components/input";
import {useForm} from "react-hook-form";
import {update} from "@/libs/ldo";
import useSubject from "@/hooks/useSubject";
import {TodoListShapeFactory} from "@/ldo/todoList.ldoFactory";
import Loading from "@/components/loading";
import {useSession} from "@inrupt/solid-ui-react";

interface TodoListTitleProps {
    listUrl: string;
    edit: boolean;
    resourceUrl: string;
}

interface FormData {
    listName: string;
}

export default function TodoListTitle({listUrl, edit, resourceUrl}: TodoListTitleProps) {
    const {fetch} = useSession();
    const {register, handleSubmit} = useForm<FormData>();
    const {
        data: list,
        mutate: mutateList
    } = useSubject<TodoListShape>(listUrl, resourceUrl, TodoListShapeFactory);

    if (!list) {
        return <Loading/>
    }

    const onSubmit = handleSubmit(async (data, event) => {
        event?.preventDefault();
        list.name = data.listName;
        await update(list, resourceUrl, fetch);
        await mutateList(list.$clone());
    });

    if (!edit) {
        return <h2>{list.name}</h2>
    }

    return (
        <form onSubmit={onSubmit}>
            <Input defaultValue={list.name || ""} {...register("listName")}>Name</Input>
        </form>
    )
}