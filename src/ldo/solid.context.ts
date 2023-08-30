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
  Person: "http://xmlns.com/foaf/0.1/Person",
  name: {
    "@id": "http://xmlns.com/foaf/0.1/name",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  fn: {
    "@id": "http://www.w3.org/2006/vcard/ns#fn",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  storage: {
    "@id": "http://www.w3.org/ns/pim/space#storage",
    "@type": "@id",
    "@container": "@set",
  },
  preferencesFile: {
    "@id": "http://www.w3.org/ns/pim/space#preferencesFile",
    "@type": "@id",
  },
  publicTypeIndex: {
    "@id": "http://www.w3.org/ns/solid/terms#publicTypeIndex",
    "@type": "@id",
  },
  privateTypeIndex: {
    "@id": "http://www.w3.org/ns/solid/terms#privateTypeIndex",
    "@type": "@id",
  },
};
