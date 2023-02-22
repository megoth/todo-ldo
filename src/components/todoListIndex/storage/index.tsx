import useSubject from "@/hooks/useSubject";
import {DocumentShape} from "@/ldo/todo.typings";
import {getResourceUrl} from "@/libs/ldo";
import ErrorDetails from "@/components/errorDetails";
import Loading from "@/components/loading";
import {DocumentShapeFactory} from "@/ldo/todo.ldoFactory";
import Button from "@/components/button";
import TodoListIndexList from "@/components/todoListIndex/list";

interface TodoListIndexStorageProps {
    storageUrl?: string;
    showStorage?: boolean
}

export default function TodoListIndexStorage({showStorage, storageUrl}: TodoListIndexStorageProps) {
    const {
        data: storage,
        error: storageError,
        isLoading: storageIsLoading
    } = useSubject<DocumentShape>(storageUrl, getResourceUrl(storageUrl), DocumentShapeFactory);

    if (storageError) {
        return <ErrorDetails error={storageError}/>
    }

    if (!storage || storageIsLoading) {
        return <Loading/>
    }

    return (
        <>
            {showStorage && (
                <h2>
                    <Button variant="link" href={storage["@id"]}>Storage</Button>
                </h2>
            )}
            {storage.list?.map((list) => (
                <TodoListIndexList key={list["@id"]} listUrl={list["@id"]} resourceUrl={storageUrl} />
            ))}
        </>
    )
}