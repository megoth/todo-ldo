import namespace from "@rdfjs/namespace";

export const solid = namespace("http://www.w3.org/ns/solid/terms#");
let todoNamespace = namespace("https://icanhasweb.net/vocab/todo.ttl#");
export const todo = {
    complete: "complete",
    incomplete: "incomplete",
    List: todoNamespace.List,
    Task: todoNamespace.Task,
    TodoDocument: todoNamespace.TodoDocument,
    TodoList: todoNamespace.TodoList,
};
