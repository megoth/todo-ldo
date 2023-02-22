import Input from "@/components/input";
import {useForm} from "react-hook-form";
import {update} from "@/libs/ldo";
import useSubject from "@/hooks/useSubject";
import Loading from "@/components/loading";
import {useSession} from "@inrupt/solid-ui-react";
import {ListShape} from "@/ldo/todo.typings";
import {ListShapeFactory} from "@/ldo/todo.ldoFactory";
import Button from "@/components/button";
import styles from "./styles.module.css";

interface TodoListTitleProps {
    listUrl: string | undefined;
    resourceUrl: string | undefined;
    editModeState: any;
}

interface FormData {
    listName: string;
}

export default function TodoListTitle({listUrl, resourceUrl, editModeState}: TodoListTitleProps) {
    const {fetch} = useSession();
    const {
        register, handleSubmit, control: {
            _formState: {
                isSubmitting
            }
        }
    } = useForm<FormData>();
    const [editMode, setEditMode] = editModeState;
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

    if (editMode && !isSubmitting) {
        return (
            <form className={styles.container} onSubmit={onSubmit}>
                <Input className={styles.field} defaultValue={list.name || ""} {...register("listName")} autoFocus>Name</Input>
                <Button variant={"field"}>Save</Button>
            </form>
        )
    }

    return (
        <h1>{list.name}</h1>
    );
}