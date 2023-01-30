import useSubject from "@/hooks/useSubject";
import {TodoTaskShape} from "@/ldo/todoTask.typings";
import {TodoTaskShapeFactory} from "@/ldo/todoTask.ldoFactory";
import ErrorDetails from "@/components/errorDetails";
import Loading from "@/components/loading";

interface TodoTaskProps {
    taskUrl: string | undefined | null;
}

export default function TodoTask({taskUrl}: TodoTaskProps) {
    const {data: task, error: taskError, isLoading} = useSubject<TodoTaskShape>(taskUrl, TodoTaskShapeFactory);

    if (taskError) {
        return <ErrorDetails error={taskError}/>
    }

    if (!taskUrl || !task || isLoading) {
        return <Loading/>
    }

    if (task.taskDone) {
        return <div style={{textDecoration: "line-through"}}>{task.taskDescription}</div>
    }
    return <div>{task.taskDescription}</div>
}