import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * todoDocumentContext: JSONLD Context for todoDocument
 * =============================================================================
 */
export const todoDocumentContext: ContextDefinition = {
  type: {
    "@id": "@type",
  },
  Document: "https://icanhasweb.net/vocab/todo.ttl#Document",
  list: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#list",
    "@container": "@set",
  },
  List: "https://icanhasweb.net/vocab/todo.ttl#List",
};
