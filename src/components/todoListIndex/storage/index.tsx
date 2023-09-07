import React from "react";
import useSubject from "@/hooks/useSubject";
import {getResourceUrl} from "@/libs/ldo";
import ErrorDetails from "@/components/errorDetails";
import Loading from "@/components/loading";
import TodoListIndexItem from "src/components/todoListIndex/item";
import Link from "next/link";
import {ActiveControlsContextProvider} from "@/contexts/activeControls";
import {Document} from "@/ldo/todo.typings";
import {DocumentShapeType} from "@/ldo/todo.shapeTypes";

interface TodoListIndexStorageProps {
    storageUrl?: string;
    showStorage?: boolean
}

export default function TodoListIndexStorage({showStorage, storageUrl}: TodoListIndexStorageProps) {
    const {
        data: storage,
        error: storageError,
        isLoading: storageIsLoading
    } = useSubject<Document>(storageUrl, getResourceUrl(storageUrl), DocumentShapeType);

    if (storageError) {
        return <ErrorDetails error={storageError}/>
    }

    if (!storage || storageIsLoading) {
        return <Loading/>
    }

    return (
        <ActiveControlsContextProvider>
            {showStorage && (
                <h2>
                    <Link href={storage["@id"]!}>Storage</Link>
                </h2>
            )}
            <ul className="list has-visible-pointer-controls">
                {storage.list?.map((list) => (
                    <TodoListIndexItem key={list["@id"]} listUrl={list["@id"]} resourceUrl={storageUrl} />
                ))}
            </ul>
        </ActiveControlsContextProvider>
    )
}