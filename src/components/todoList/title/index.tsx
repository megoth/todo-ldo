import {ChangeEvent, useContext, useState} from "react";
import EditModeContext from "@/contexts/editMode";
import {TodoListShape} from "@/ldo/todoList.typings";

interface TodoListTitleProps {
    list: TodoListShape
}

export default function TodoListTitle({ list }: TodoListTitleProps) {
    const {editMode, updating} = useContext(EditModeContext);
    const [value, setValue] = useState<string>(list.name || "");
    if (!editMode) {
        return <h2>{list.name}</h2>
    }
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        list.name = event.target.value;
    }
    return <input name={"todoListTitle"} disabled={updating} onChange={onChange} value={value} />
}