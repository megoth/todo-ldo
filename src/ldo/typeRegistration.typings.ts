import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for typeRegistration
 * =============================================================================
 */

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
}
