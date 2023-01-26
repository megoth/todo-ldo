import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for webIdProfile
 * =============================================================================
 */

/**
 * WebIdProfile Type
 */
export interface WebIdProfile {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Person";
  };
  name?: string;
  storage: string[];
}
