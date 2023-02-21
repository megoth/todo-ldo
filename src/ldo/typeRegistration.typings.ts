import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for typeRegistration
 * =============================================================================
 */

/**
 * TypeRegistrationShape Type
 */
export interface TypeRegistrationShape {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "TypeRegistration";
  };
  forClass: {
    "@id": string;
  };
}
