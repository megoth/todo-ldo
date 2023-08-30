import useSubject from "@/hooks/useSubject";
import Loading from "@/components/loading";
import {getResourceUrl} from "@/libs/ldo";
import ErrorDetails from "@/components/errorDetails";
import Link from "next/link";
import TodoListIndexItemControls from "@/components/todoListIndex/item/controls";
import {Document, List} from "@/ldo/todo.typings";
import {DocumentShapeType, ListShapeType} from "@/ldo/todo.shapeTypes";

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
    } = useSubject<Document>(resourceUrl, getResourceUrl(resourceUrl), DocumentShapeType);
    const {
        data: list,
        error: listError,
        isLoading: listIsLoading
    } = useSubject<List>(listUrl, resourceUrl, ListShapeType);

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