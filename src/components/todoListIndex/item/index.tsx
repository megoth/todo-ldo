import useSubject from "@/hooks/useSubject";
import {DocumentShape, ListShape} from "@/ldo/todo.typings";
import {DocumentShapeFactory, ListShapeFactory} from "@/ldo/todo.ldoFactory";
import Loading from "@/components/loading";
import {getResourceUrl} from "@/libs/ldo";
import ErrorDetails from "@/components/errorDetails";
import Link from "next/link";
import TodoListIndexItemControls from "@/components/todoListIndex/item/controls";

interface TodoListIndexListProps {
    listUrl: string | null | undefined;
    resourceUrl: string | null | undefined;
}

export default function TodoListIndexItem({listUrl, resourceUrl}: TodoListIndexListProps) {
    const {
        data: storage,
        error: storageError,
        isLoading: storageIsLoading,
        mutate: mutateStorage,
    } = useSubject<DocumentShape>(resourceUrl, getResourceUrl(resourceUrl), DocumentShapeFactory);
    const {
        data: list,
        error: listError,
        isLoading: listIsLoading
    } = useSubject<ListShape>(listUrl, resourceUrl, ListShapeFactory);

    if (storageError) {
        return <ErrorDetails error={storageError || listError}/>
    }

    if (!storage || storageIsLoading || !list || listIsLoading) {
        return <Loading/>
    }

    return (
        <div className="list-item">
            <div className="list-item-content">
                <Link className="list-item-title" href={`/list/${encodeURIComponent(list["@id"]!)}`}>
                    {list.name || "[Unnamed list]"}
                </Link>
                <div className="list-item-description">{list.task?.length} tasks</div>
            </div>
            <div className="list-item-controls">
                <TodoListIndexItemControls
                    id={`controls-${list["@id"]}}`}
                    list={list}
                    resourceUrl={resourceUrl}
                    mutateStorage={mutateStorage}
                    storage={storage}/>
            </div>
        </div>
    )
}