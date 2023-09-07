import React from "react";
import Button from "@/components/button";
import {FiDelete} from "react-icons/fi";
import {remove, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {Document, List} from "@/ldo/todo.typings";

interface Props {
    className?: string;
    list: List;
    mutateStorage: (storage?: Document) => void;
    resourceUrl: string | null | undefined;
    storage: Document;
}

export function TodoListIndexItemDelete({className, list, mutateStorage, resourceUrl, storage}: Props) {
    const {fetch} = useSession();

    const onDelete = async () => {
        const lists = storage.list!;
        const listIndex = lists.findIndex((l) => l["@id"] === list["@id"])
        // First removing tasks connected to item
        await Promise.all(list.task!.map(async (task) => remove(task, storage["@id"], fetch)));
        // Then removing the item itself
        await remove(list, resourceUrl, fetch);
        // Then removing item from index
        await update(storage, resourceUrl, fetch, (storage) => {
            storage.list = [
                ...lists.slice(0, listIndex),
                ...lists.slice(listIndex + 1)
            ];
        });
        // Clean up
        return mutateStorage();
    };
    return (
        <Button className={className} variant="danger" onClick={onDelete}>
            <span>Delete</span>
            <span className="icon"><FiDelete/></span>
        </Button>
    )
}