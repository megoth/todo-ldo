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
import {useEffect} from "react";

interface TodoListTitleProps {
    listUrl: string | undefined;
    resourceUrl: string | null | undefined;
    editMode: boolean;
    onSubmitted: () => void;
}

interface FormData {
    listName: string;
}

export default function TodoListTitle({listUrl, resourceUrl, editMode, onSubmitted}: TodoListTitleProps) {
    const {fetch} = useSession();
    const {
        data: list,
        mutate: mutateList
    } = useSubject<ListShape>(listUrl, resourceUrl, ListShapeFactory);
    const {
        reset, setValue, register, handleSubmit, control: {
            _formState: {
                isSubmitting
            }
        }
    } = useForm<FormData>({
        defaultValues: {
            listName: ""
        }
    });
    useEffect(() => setValue("listName", list?.name || ""), [list?.name]);

    if (!list) {
        return <Loading/>
    }

    const onSubmit = handleSubmit(async (data, event) => {
        event?.preventDefault();
        list.name = data.listName;
        await update(list, resourceUrl, fetch);
        await mutateList(list.$clone());
        reset(data);
        onSubmitted();
    });

    const onReset = () => {
        reset({
            listName: list?.name || ""
        });
        onSubmitted();
    };

    if (editMode && !isSubmitting) {
        return (
            <form className={styles.container} onSubmit={onSubmit} onReset={onReset}>
                <Input className={styles.field} {...register("listName")} autoFocus>Name</Input>
                <Button variant="field">Save</Button>
                <Button variant="field" type="reset">Cancel</Button>
            </form>
        )
    }

    return (
        <h1>{list.name}</h1>
    );
}