import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * typeRegistrationContext: JSONLD Context for typeRegistration
 * =============================================================================
 */
export const typeRegistrationContext: ContextDefinition = {
  type: {
    "@id": "@type",
    "@container": "@set",
  },
  TypeRegistration: "http://www.w3.org/ns/solid/terms#TypeRegistration",
  forClass: {
    "@id": "http://www.w3.org/ns/solid/terms#forClass",
    "@type": "@id",
  },
  instanceContainer: {
    "@id": "http://www.w3.org/ns/solid/terms#instanceContainer",
    "@type": "@id",
  },
  Container: "http://www.w3.org/ns/ldp#Container",
  instance: {
    "@id": "http://www.w3.org/ns/solid/terms#instance",
    "@type": "@id",
  },
};
