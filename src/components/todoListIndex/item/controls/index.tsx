import React, {useContext} from "react";
import {TodoListIndexItemDelete} from "@/components/todoListIndex/item/delete";
import clsx from "clsx";
import {FiMoreHorizontal} from "react-icons/fi";
import ActiveControlsContext from "@/contexts/activeControls";
import {Document, List} from "@/ldo/todo.typings";

interface Props {
    id: string;
    list: List;
    mutateStorage: (storage?: Document) => void;
    resourceUrl: string | null | undefined;
    storage: Document;
}

export default function TodoListIndexListControls({id, list, mutateStorage, resourceUrl, storage}: Props) {
    const {activeControlsId, toggleActiveControlsId} = useContext(ActiveControlsContext);
    return (
        <div className={clsx("dropdown is-right", {
            "is-active": activeControlsId === id
        })}>
            <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls={id} onClick={() => toggleActiveControlsId(id)}>
                    <FiMoreHorizontal/>
                </button>
            </div>
            <div className="dropdown-menu" id={id} role="menu">
                <div className="dropdown-content">
                    <TodoListIndexItemDelete className={"dropdown-item"}
                                             list={list}
                                             storage={storage}
                                             mutateStorage={mutateStorage}
                                             resourceUrl={resourceUrl}/>
                </div>
            </div>
        </div>
    )
}