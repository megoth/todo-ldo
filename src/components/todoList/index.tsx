import useSubject from "@/hooks/useSubject";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import TodoTask from "@/components/todoTask";
import TodoListCreateTask from "@/components/todoList/createTask";
import FlexBar from "@/components/flexBar";
import TodoListChangeName from "@/components/todoList/changeName";
import {List} from "@/ldo/todo.typings";
import {ListShapeType} from "@/ldo/todo.shapeTypes";

interface TodoListProps {
    listUrl: string | undefined;
    resourceUrl: string | null | undefined;
}


export default function TodoList({listUrl, resourceUrl}: TodoListProps) {
    const {
        data: list,
        error: listError,
        isLoading,
    } = useSubject<List>(listUrl, resourceUrl, ListShapeType);

    if (listError) {
        return <ErrorDetails error={listError}/>
    }

    if (!list || isLoading) {
        return <Loading/>
    }

    return (
        <>
            <h1 className="title">{list.name}</h1>
            <FlexBar>
                <TodoListChangeName listUrl={listUrl} resourceUrl={resourceUrl}/>
                <TodoListCreateTask listUrl={listUrl} resourceUrl={resourceUrl} />
            </FlexBar>
            <ul className="list has-visible-pointer-controls">
                {list.task?.map((task) => (
                    <TodoTask key={task["@id"]} listUrl={list["@id"]} taskUrl={task["@id"]} resourceUrl={resourceUrl}/>
                ))}
            </ul>
        </>
    )
}