import {createNamespace} from "@/libs/ldo";

const todo = createNamespace("https://icanhasweb.net/vocab/todo.ttl#");

export const incomplete = todo("incomplete");
export const complete = todo("complete");