import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for solid
 * =============================================================================
 */

/**
 * TypeIndex Type
 */
export interface TypeIndex {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "TypeIndex";
  };
}

/**
 * TypeRegistration Type
 */
export interface TypeRegistration {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "TypeRegistration";
  };
  forClass: {
    "@id": string;
  };
  instance: {
    "@id": string;
  };
}
