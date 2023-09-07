import React from "react";
import Button from "@/components/button";
import {useModal} from "react-modal-hook";
import TodoTaskDescriptionButtonModal from "@/components/todoTaskDescriptionButton/modal";

interface Props {
    taskUrl: string | undefined;
    resourceUrl: string | null | undefined;
}

export default function TodoTaskDescriptionButton({taskUrl, resourceUrl}: Props) {
    const [showModal, hideModal] = useModal(() => {
        return <TodoTaskDescriptionButtonModal hideModal={hideModal} taskUrl={taskUrl} resourceUrl={resourceUrl}/>
    }, [taskUrl, resourceUrl]);

    return (
        <Button onClick={showModal}>
            <span>Change</span>
        </Button>
    )
}