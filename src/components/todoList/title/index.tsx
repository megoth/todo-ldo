import Input from "@/components/input";
import {useForm} from "react-hook-form";
import {update} from "@/libs/ldo";
import useSubject from "@/hooks/useSubject";
import Loading from "@/components/loading";
import {useSession} from "@inrupt/solid-ui-react";
import {useState} from "react";
import Button from "@/components/button";
import {ListShape} from "@/ldo/todo.typings";
import {ListShapeFactory} from "@/ldo/todo.ldoFactory";

interface TodoListTitleProps {
    listUrl: string | undefined;
    resourceUrl: string | undefined;
}

interface FormData {
    listName: string;
}

export default function TodoListTitle({listUrl, resourceUrl}: TodoListTitleProps) {
    const {fetch} = useSession();
    const {register, handleSubmit, control: {
        _formState: {
            isSubmitting
        }
    }} = useForm<FormData>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const {
        data: list,
        mutate: mutateList
    } = useSubject<ListShape>(listUrl, resourceUrl, ListShapeFactory);

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
            <Input disabled={isSubmitting} defaultValue={list.name || ""} {...register("listName")}>Name</Input>
        </form>
    )
}