import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * solidContext: JSONLD Context for solid
 * =============================================================================
 */
export const solidContext: ContextDefinition = {
  type: {
    "@id": "@type",
    "@container": "@set",
  },
  TypeIndex: "http://www.w3.org/ns/solid/terms#TypeIndex",
  ListedDocument: "http://www.w3.org/ns/solid/terms#ListedDocument",
  UnlistedDocument: "http://www.w3.org/ns/solid/terms#UnlistedDocument",
  TypeRegistration: "http://www.w3.org/ns/solid/terms#TypeRegistration",
  forClass: {
    "@id": "http://www.w3.org/ns/solid/terms#forClass",
    "@type": "@id",
  },
  instance: {
    "@id": "http://www.w3.org/ns/solid/terms#instance",
    "@type": "@id",
  },
};
