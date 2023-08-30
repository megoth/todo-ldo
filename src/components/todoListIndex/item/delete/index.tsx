import Button from "@/components/button";
import {FiDelete} from "react-icons/fi";
import {remove, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {Document, List} from "@/ldo/todo.typings";
import {startTransaction} from "ldo";

interface Props {
    className?: string;
    list: List;
    mutateStorage: () => void;
    resourceUrl: string | null | undefined;
    storage: Document;
}

export function TodoListIndexItemDelete({className, list, mutateStorage, resourceUrl, storage}: Props) {
    const {fetch} = useSession();

    const onDelete = async () => {
        const lists = storage.list!;
        const listIndex = lists.findIndex((l) => l["@id"] === list["@id"])
        // First removing tasks connected to item
        await Promise.all(list.task!.map(async (task) => {
            startTransaction(task);
            return remove(task, storage["@id"], fetch);
        }));
        // const tasks = await Promise.all(item.task!.map((task) => remove(task, resourceUrl, fetch)));
        // Then removing the item itself
        startTransaction(list);
        await remove(list, resourceUrl, fetch);
        // Then removing item from index
        startTransaction(storage);
        storage.list = [
            ...lists.slice(0, listIndex),
            ...lists.slice(listIndex + 1)
        ];
        await update(storage, resourceUrl, fetch);
        return mutateStorage();
    };
    return (
        <Button className={className} variant="danger" onClick={onDelete}>
            <span>Delete</span>
            <span className="icon"><FiDelete/></span>
        </Button>
    )
}