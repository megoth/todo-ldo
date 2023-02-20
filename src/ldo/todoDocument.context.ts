import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * todoDocumentContext: JSONLD Context for todoDocument
 * =============================================================================
 */
export const todoDocumentContext: ContextDefinition = {
  type: {
    "@id": "@type",
    "@type": "https://icanhasweb.net/vocab/todo.ttl#Document",
  },
  list: {
    "@id": "https://icanhasweb.net/vocab/todo.ttl#list",
    "@type": "@id",
    "@container": "@set",
  },
};
