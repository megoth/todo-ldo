import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for typeIndex
 * =============================================================================
 */

/**
 * TypeIndexShape Type
 */
export interface TypeIndexShape {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "TypeIndex";
  };
}
