import {LinkedDataObject} from "ldo";
import {TodoListShape} from "@/ldo/todoList.typings";
import {TodoTaskShape} from "@/ldo/todoTask.typings";
import useSubject from "@/hooks/useSubject";
import {TodoListShapeFactory} from "@/ldo/todoList.ldoFactory";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import TodoTask from "@/components/todoTask";

interface TodoListProps {
    listUrl: string | null;
}


export default function TodoList({listUrl}: TodoListProps) {
    const [list, listError] = useSubject<TodoListShape>(listUrl, TodoListShapeFactory);

    if (listError) {
        return <ErrorDetails error={listError}/>
    }

    if (!list) {
        return <Loading/>
    }


    return (
        <div>
            <h2>{list.listName}</h2>
            <ul>
                {list.hasTask?.map((task: TodoTaskShape, index: number) => (
                    <TodoTask key={`task-${index}`} taskUrl={task["@id"]}/>
                ))}
            </ul>
        </div>
    )
}