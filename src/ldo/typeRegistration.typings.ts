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
  type: string;
  forClass: {
    "@id": string;
  };
}