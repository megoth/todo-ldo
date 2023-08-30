import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for todo
 * =============================================================================
 */

/**
 * Document Type
 */
export interface Document {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "Document";
  };
  list?: List[];
}

/**
 * List Type
 */
export interface List {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: {
    "@id": "List";
  };
  name?: string;
  task?: Task[];
}

/**
 * Task Type
 */
export interface Task {
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
