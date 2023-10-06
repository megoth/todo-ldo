import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for solid
 * =============================================================================
 */

/**
 * Container Type
 */
export interface Container {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type:
    | {
        "@id": "BasicContainer";
      }
    | {
        "@id": "Container";
      };
}

/**
 * Resource Type
 */
export interface Resource {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Resource";
  };
}

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

/**
 * TypeRegistration Type
 */
export interface TypeRegistration {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "TypeRegistration";
  };
  forClass: {
    "@id": string;
  };
  instance: {
    "@id": string;
  };
}
