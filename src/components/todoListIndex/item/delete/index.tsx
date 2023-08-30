import Button from "@/components/button";
import {FiDelete} from "react-icons/fi";
import {TaskShapeFactory} from "@/ldo/todo.ldoFactory";
import {remove, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {LinkedDataObject} from "ldo";
import {DocumentShape, ListShape} from "@/ldo/todo.typings";
import {KeyedMutator} from "swr/_internal";

interface Props {
    className?: string;
    list: LinkedDataObject<ListShape>;
    mutateStorage: KeyedMutator<LinkedDataObject<DocumentShape> | null>;
    resourceUrl: string | null | undefined;
    storage: LinkedDataObject<DocumentShape>;
}

export function TodoListIndexItemDelete({className, list, mutateStorage, resourceUrl, storage}: Props) {
    const {fetch} = useSession();

    const onDelete = async () => {
        const lists = storage.list!;
        const listIndex = lists.findIndex((l) => l["@id"] === list["@id"])
        // First removing tasks connected to item
        await Promise.all(list.task!.map(async (task) => {
            const shape = await TaskShapeFactory.parse(task["@id"]!, storage.$dataset());
            return remove(shape, storage["@id"], fetch);
        }));
        // const tasks = await Promise.all(item.task!.map((task) => remove(task, resourceUrl, fetch)));
        // Then removing the item itself
        await remove(list, resourceUrl, fetch);
        // Then removing item from index
        storage.list = [
            ...lists.slice(0, listIndex),
            ...lists.slice(listIndex + 1)
        ];
        await update(storage, resourceUrl, fetch);
        await mutateStorage(storage.$clone());
    };
    return (
        <Button className={className} variant="danger" onClick={onDelete}>
            <span>Delete</span>
            <span className="icon"><FiDelete/></span>
        </Button>
    )
}