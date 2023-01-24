import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * todoContext: JSONLD Context for todo
 * =============================================================================
 */
export const todoContext: ContextDefinition = {
  type: {
    "@id": "@type",
    "@type": [
      "https://icanhasweb.net/vocab/todo.ttl#TodoList",
      "https://icanhasweb.net/vocab/todo.ttl#TodoTask",
    ],
    "@container": "@set",
  },
  listName: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#listName",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  hasTask: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#hasTask",
    "@type": "https://icanhasweb.net/vocab/todo.ttl#TodoTask",
    "@container": "@set",
  },
  taskDescription: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#taskDescription",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  taskDone: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#taskDone",
    "@type": "http://www.w3.org/2001/XMLSchema#boolean",
  },
};
