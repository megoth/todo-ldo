import {LinkedDataObject} from "ldo";
import {TodoListShape} from "@/ldo/todoList.typings";

interface TodoListProps {
    list: LinkedDataObject<TodoListShape>;
}


export default function TodoList({ list }: TodoListProps) {
    return (
        <div>
            <h2>{list.listName}</h2>
            <ul>
                {list.hasTask?.map((task) => {
                    console.log(task)
                    return (
                        <li>test</li>
                    );
                })}
            </ul>
        </div>
    )
}