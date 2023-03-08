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
    const [createList, setCreateList] = useState<string | null>();
    const showStorage = !!storages && storages.length > 1;
    return (
        <>
            <h1 className="title">Todo Lists</h1>
            {!showStorage && (
                <FlexBar>
                    <Button variant="primary" onClick={() => setCreateList(storages?.[0])}>
                        <span>Create new list</span>
                        <span className="icon"><FiPlusSquare/></span>
                    </Button>
                </FlexBar>
            )}
            {storages?.map((storageUrl) => (
                <Fragment key={storageUrl}>
                    <TodoListIndexCreateList
                        resourceUrl={storageUrl}
                        editMode={createList === storageUrl}
                        onSubmitted={() => setCreateList(null)}/>
                    <TodoListIndexStorage
                        storageUrl={storageUrl}
                        showStorage={showStorage}/>
                </Fragment>
            ))}
        </>
    )
}