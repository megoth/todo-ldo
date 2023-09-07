import React from "react";
import Button from "@/components/button";
import {FiEdit2} from "react-icons/fi";
import {useModal} from "react-modal-hook";
import TodoListNameButtonModal from "@/components/todoListNameButton/modal";

interface Props {
    listUrl: string | undefined;
    resourceUrl: string | null | undefined;
}

export default function TodoListNameButton({listUrl, resourceUrl}: Props) {
    const [showModal, hideModal] = useModal(() => {
        return <TodoListNameButtonModal hideModal={hideModal} listUrl={listUrl} resourceUrl={resourceUrl} />
    }, [listUrl]);

    return (
        <Button onClick={showModal}>
            <span>Change name</span>
            <span className="icon"><FiEdit2/></span>
        </Button>
    )
}