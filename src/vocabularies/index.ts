import namespace from "@rdfjs/namespace";
import {getValue} from "@/libs/ldo";

export const solidNamespace = namespace("http://www.w3.org/ns/solid/terms#");
export const solid = {
    TypeRegistration: getValue<"TypeRegistration">(solidNamespace.TypeRegistration.value)
}
export const todoNamespace = namespace("https://icanhasweb.net/vocab/todo.ttl#");
export const todo = {
    complete: getValue<"complete">("complete"),
    completeValue: "complete",
    incomplete: getValue<"incomplete">("incomplete"),
    incompleteValue: "incomplete",
    List: getValue<"List">(todoNamespace.List.value),
    Task: getValue<"Task">(todoNamespace.Task.value),
    TodoDocument: getValue<"Document">(todoNamespace.TodoDocument.value),
    TodoList: getValue<string>(todoNamespace.TodoList.value),
};
