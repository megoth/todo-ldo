import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * todoTaskContext: JSONLD Context for todoTask
 * =============================================================================
 */
export const todoTaskContext: ContextDefinition = {
  type: {
    "@id": "@type",
    "@type": "https://icanhasweb.net/vocab/todo.ttl#TodoTask",
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
