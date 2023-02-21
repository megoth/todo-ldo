import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * resourceContext: JSONLD Context for resource
 * =============================================================================
 */
export const resourceContext: ContextDefinition = {
  type: {
    "@id": "@type",
  },
  Resource: "http://www.w3.org/ns/ldp#Resource",
};
