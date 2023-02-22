import TodoListIndexStorage from "@/components/todoListIndex/storage";
import FlexBar from "@/components/flexBar";
import Button from "@/components/button";
import {FiPlusSquare} from "react-icons/fi";
import {Fragment, useState} from "react";
import TodoListIndexCreateList from "@/components/todoListIndex/createList";

interface TodoListIndexPageProps {
    storages: string[] | null;
}

export default function TodoListIndex({storages}: TodoListIndexPageProps) {
    const [createList, setCreateList] = useState<boolean>(false);
    const showStorage = !!storages && storages.length > 1;
    return (
        <>
            <h1>Todo Lists</h1>
            {!showStorage && (
                <FlexBar>
                    <Button onClick={() => setCreateList(true)}>
                        <span>Create new list</span>
                        <FiPlusSquare/>
                    </Button>
                </FlexBar>
            )}
            {storages?.map((storageUrl) => (
                <Fragment key={storageUrl}>
                    <TodoListIndexStorage key={storageUrl} storageUrl={storageUrl} showStorage={showStorage}/>
                    <TodoListIndexCreateList resourceUrl={storageUrl} editMode={createList}
                                             onSubmitted={() => setCreateList(false)}/>
                </Fragment>
            ))}
        </>
    )
}