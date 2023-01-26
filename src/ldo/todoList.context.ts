import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * todoListContext: JSONLD Context for todoList
 * =============================================================================
 */
export const todoListContext: ContextDefinition = {
  type: {
    "@id": "@type",
    "@type": "https://icanhasweb.net/vocab/todo.ttl#TodoList",
  },
  listName: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#listName",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  hasTask: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#hasTask",
    "@type": "https://ldo.js.org/TodoTaskShape",
    "@container": "@set",
  },
};
