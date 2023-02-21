import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * todoTaskContext: JSONLD Context for todoTask
 * =============================================================================
 */
export const todoTaskContext: ContextDefinition = {
  type: {
    "@id": "@type",
  },
  Task: "https://icanhasweb.net/vocab/todo.ttl#Task",
  description: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#description",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  status: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#status",
  },
  complete: "https://icanhasweb.net/vocab/todo.ttl#complete",
  incomplete: "https://icanhasweb.net/vocab/todo.ttl#incomplete",
};
