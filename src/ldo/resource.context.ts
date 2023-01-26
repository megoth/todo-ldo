import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * resourceContext: JSONLD Context for resource
 * =============================================================================
 */
export const resourceContext: ContextDefinition = {
  type: {
    "@id": "@type",
    "@type": "http://www.w3.org/ns/ldp#Resource",
  },
};
