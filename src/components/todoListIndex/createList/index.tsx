import {Dispatch, SetStateAction} from "react";
import {createSubjectUrl, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {useForm} from "react-hook-form";
import useSubject from "@/hooks/useSubject";
import {DocumentShape, ListShape, TaskShape} from "@/ldo/todo.typings";
import {DocumentShapeFactory, ListShapeFactory, TaskShapeFactory} from "@/ldo/todo.ldoFactory";
import {LinkedDataObject} from "ldo";
import {todo} from "@/vocabularies";
import styles from "@/components/todoList/title/styles.module.css";
import Input from "@/components/input";
import Button from "@/components/button";
import Loading from "@/components/loading";
import ContentGroup from "@/components/contentGroup";
import ErrorDetails from "@/components/errorDetails";

interface TodoListIndexCreateListProps {
    resourceUrl: string | null | undefined;
    editMode: boolean;
    onSubmitted: () => void;
}

interface FormData {
    listName: string;
}

export default function TodoListIndexCreateList({resourceUrl, editMode, onSubmitted}: TodoListIndexCreateListProps) {
    const {data: storage, error: storageError, isLoading: storageIsLoading, mutate: mutateStorage} = useSubject<DocumentShape>(resourceUrl, resourceUrl, DocumentShapeFactory);
    const {fetch} = useSession();
    const {register, handleSubmit, reset} = useForm<FormData>({
        defaultValues: {
            listName: "A new list"
        }
    });

    if (!editMode) {
        return null;
    }

    if (storageError) {
        return <ErrorDetails error={storageError}/>
    }

    if (!storage || storageIsLoading) {
        return <Loading />
    }

    const onSubmit = handleSubmit(async (data, event) => {
        const list = ListShapeFactory.new(createSubjectUrl(resourceUrl)) as LinkedDataObject<ListShape>;
        list.type = todo.List;
        list.name = data.listName;
        await update(list, resourceUrl, fetch);
        storage?.list?.unshift(list);
        await update(storage, resourceUrl, fetch);
        await mutateStorage(storage.$clone());
        reset();
        onSubmitted();
    });

    const onReset = () => {
        reset();
        onSubmitted();
    }

    return (
        <ContentGroup>
            <form className={styles.container} onSubmit={onSubmit} onReset={onReset}>
                <Input className={styles.field} {...register("listName")} autoFocus>Name</Input>
                <Button variant="field">Create</Button>
                <Button variant="field" type="reset">Cancel</Button>
            </form>
        </ContentGroup>
    )
}