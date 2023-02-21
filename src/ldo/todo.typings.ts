import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for todo
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
  list?: ListShape[];
}

/**
 * ListShape Type
 */
export interface ListShape {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "List";
  };
  name?: string;
  task?: TaskShape[];
}

/**
 * TaskShape Type
 */
export interface TaskShape {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Task";
  };
  description: string;
  status?:
    | {
        "@id": "complete";
      }
    | {
        "@id": "incomplete";
      };
}
