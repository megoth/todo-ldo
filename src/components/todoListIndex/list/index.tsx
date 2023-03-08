import useSubject from "@/hooks/useSubject";
import {DocumentShape, ListShape} from "@/ldo/todo.typings";
import {DocumentShapeFactory, ListShapeFactory, TaskShapeFactory} from "@/ldo/todo.ldoFactory";
import ContentGroup from "@/components/contentGroup";
import Button from "@/components/button";
import {FiDelete} from "react-icons/fi";
import Loading from "@/components/loading";
import {getResourceUrl, remove, update} from "@/libs/ldo";
import ErrorDetails from "@/components/errorDetails";
import {useSession} from "@inrupt/solid-ui-react";
import Link from "next/link";

interface TodoListIndexListProps {
    listUrl: string | null | undefined;
    resourceUrl: string | null | undefined;
}

export default function TodoListIndexList({listUrl, resourceUrl}: TodoListIndexListProps) {
    const {fetch} = useSession();
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

    const onDelete = async () => {
        const lists = storage.list!;
        const listIndex = lists.findIndex((l) => l["@id"] === list["@id"])
        // First removing tasks connected to list
        await Promise.all(list.task!.map(async (task) => {
            const shape = await TaskShapeFactory.parse(task["@id"]!, storage.$dataset());
            return remove(shape, storage["@id"], fetch);
        }));
        // const tasks = await Promise.all(list.task!.map((task) => remove(task, resourceUrl, fetch)));
        // Then removing the list itself
        await remove(list, resourceUrl, fetch);
        // Then removing list from index
        storage.list = [
            ...lists.slice(0, listIndex),
            ...lists.slice(listIndex + 1)
        ];
        await update(storage, resourceUrl, fetch);
        await mutateStorage(storage.$clone());
    };

    return (
        <div className="list-item">
            <div className="list-item-content">
                <Link className="list-item-title" href={`/list/${encodeURIComponent(list["@id"]!)}`}>
                    {list.name || "[Unnamed list]"}
                </Link>
                <div className="list-item-description">{list.task?.length} tasks</div>
            </div>
            <div className="list-item-controls">
                <Button variant="danger" onClick={onDelete}>
                    <span>Delete</span>
                    <span className="icon"><FiDelete/></span>
                </Button>
            </div>
        </div>
    )
}