import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * typeIndexContext: JSONLD Context for typeIndex
 * =============================================================================
 */
export const typeIndexContext: ContextDefinition = {
  type: {
    "@id": "@type",
    "@container": "@set",
  },
  TypeIndex: "http://www.w3.org/ns/solid/terms#TypeIndex",
  ListedDocument: "http://www.w3.org/ns/solid/terms#ListedDocument",
  UnlistedDocument: "http://www.w3.org/ns/solid/terms#UnlistedDocument",
};
