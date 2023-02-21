import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for todoDocument
 * =============================================================================
 */

/**
 * DocumentShape Type
 */
export interface DocumentShape {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Document";
  };
  list?: {
    "@id": "List";
  }[];
}
