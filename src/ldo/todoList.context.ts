import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * todoListContext: JSONLD Context for todoList
 * =============================================================================
 */
export const todoListContext: ContextDefinition = {
  type: {
    "@id": "@type",
  },
  List: "https://icanhasweb.net/vocab/todo.ttl#List",
  name: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#name",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  task: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#task",
    "@container": "@set",
  },
  Task: "https://icanhasweb.net/vocab/todo.ttl#Task",
};
