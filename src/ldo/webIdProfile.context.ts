import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * webIdProfileContext: JSONLD Context for webIdProfile
 * =============================================================================
 */
export const webIdProfileContext: ContextDefinition = {
  type: {
    "@id": "@type",
  },
  Person: "http://xmlns.com/foaf/0.1/Person",
  name: {
    "@id": "http://xmlns.com/foaf/0.1/name",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  storage: {
    "@id": "http://www.w3.org/ns/pim/space#storage",
    "@type": "@id",
    "@container": "@set",
  },
};
