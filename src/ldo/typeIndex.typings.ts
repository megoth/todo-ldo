import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for typeIndex
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
