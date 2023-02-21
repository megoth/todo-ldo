import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for resource
 * =============================================================================
 */

/**
 * ResourceShape Type
 */
export interface ResourceShape {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Resource";
  };
}
