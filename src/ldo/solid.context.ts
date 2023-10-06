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
  BasicContainer: "http://www.w3.org/ns/ldp#BasicContainer",
  Container: "http://www.w3.org/ns/ldp#Container",
  contains: {
    "@id": "http://www.w3.org/ns/ldp#contains",
    "@type": "@id",
    "@container": "@set",
  },
  Resource: "http://www.w3.org/ns/ldp#Resource",
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
