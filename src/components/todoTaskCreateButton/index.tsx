import React from "react";
import Button from "@/components/button";
import {useModal} from "react-modal-hook";
import {FiPlusSquare} from "react-icons/fi";
import TodoTaskCreateButtonModal from "@/components/todoTaskCreateButton/modal";

interface TodoListCreateTaskProps {
    listUrl: string | null | undefined;
    resourceUrl: string | null | undefined;
}

export default function TodoTaskCreateButton({listUrl, resourceUrl}: TodoListCreateTaskProps) {
    const [showModal, hideModal] = useModal(() => {
        return <TodoTaskCreateButtonModal hideModal={hideModal} listUrl={listUrl} resourceUrl={resourceUrl} />;
    }, [listUrl, resourceUrl]);

    return (
        <Button onClick={showModal}>
            <span>Add task</span>
            <span className="icon"><FiPlusSquare/></span>
        </Button>
    )
}