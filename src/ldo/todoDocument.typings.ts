import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for todoDocument
 * =============================================================================
 */

/**
 * TodoDocumentShape Type
 */
export interface TodoDocumentShape {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: string;
  list?: {
    "@id": string;
  }[];
}
