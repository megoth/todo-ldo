import {TodoListShape} from "@/ldo/todoList.typings";
import Input from "@/components/input";
import {useForm} from "react-hook-form";
import {update} from "@/libs/ldo";
import useSubject from "@/hooks/useSubject";
import {TodoListShapeFactory} from "@/ldo/todoList.ldoFactory";
import Loading from "@/components/loading";
import {useSession} from "@inrupt/solid-ui-react";
import {useState} from "react";
import Button from "@/components/button";

interface TodoListTitleProps {
    listUrl: string;
    resourceUrl: string;
}

interface FormData {
    listName: string;
}

export default function TodoListTitle({listUrl, resourceUrl}: TodoListTitleProps) {
    const {fetch} = useSession();
    const {register, handleSubmit} = useForm<FormData>();
    const [editMode, setEditMode] = useState<boolean>(false);
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
        setEditMode(false);
    });

    if (!editMode) {
        return (
            <div>
                <h1>{list.name}</h1>
                <Button onClick={() => setEditMode(true)}>Change</Button>
            </div>
        );

    }

    return (
        <form onSubmit={onSubmit}>
            <Input defaultValue={list.name || ""} {...register("listName")}>Name</Input>
        </form>
    )
}