import namespace from "@rdfjs/namespace";
import { getValue } from "@/libs/ldo";

export const todoNamespace = namespace("https://icanhasweb.net/vocab/todo.ttl#");
export const todo = {
  complete: getValue<"complete">("complete"),
  completeValue: "complete",
  incomplete: getValue<"incomplete">("incomplete"),
  incompleteValue: "incomplete",
  List: getValue<"List">(todoNamespace.List.value),
  Task: getValue<"Task">(todoNamespace.Task.value),
  TodoDocument: getValue<"Document">(todoNamespace.TodoDocument.value),
  TodoList: getValue<"TodoList">(todoNamespace.TodoList.value)
};
