import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for webIdProfile
 * =============================================================================
 */

/**
 * WebIdProfileShape Type
 */
export interface WebIdProfileShape {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Person";
  };
  name?: string;
  fn?: string;
  storage: {
    "@id": string;
  }[];
}
