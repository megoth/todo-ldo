import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for solid
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

/**
 * TypeRegistrationShape Type
 */
export interface TypeRegistrationShape {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "TypeRegistration";
  };
  forClass: {
    "@id": string;
  };
}

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
  preferencesFile?: {
    "@id": string;
  };
  publicTypeIndex?: {
    "@id": string;
  };
  privateTypeIndex?: {
    "@id": string;
  };
}
