import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * containerContext: JSONLD Context for container
 * =============================================================================
 */
export const containerContext: ContextDefinition = {
  type: {
    "@id": "@type",
  },
  BasicContainer: "http://www.w3.org/ns/ldp#BasicContainer",
  Container: "http://www.w3.org/ns/ldp#Container",
  contains: {
    "@id": "http://www.w3.org/ns/ldp#contains",
    "@type": "@id",
    "@container": "@set",
  },
};
