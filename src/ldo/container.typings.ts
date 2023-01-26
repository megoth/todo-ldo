import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for container
 * =============================================================================
 */

/**
 * ContainerShape Type
 */
export interface ContainerShape {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type:
    | {
        "@id": "BasicContainer";
      }
    | {
        "@id": "Container";
      };
  contains?: {
    "@id": string;
  }[];
}
