import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * todoContext: JSONLD Context for todo
 * =============================================================================
 */
export const todoContext: ContextDefinition = {
  type: {
    "@id": "@type",
    "@container": "@set",
  },
  Document: "https://icanhasweb.net/vocab/todo.ttl#Document",
  list: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#list",
    "@type": "@id",
    "@container": "@set",
  },
  List: "https://icanhasweb.net/vocab/todo.ttl#List",
  name: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#name",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  task: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#task",
    "@type": "@id",
    "@container": "@set",
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
