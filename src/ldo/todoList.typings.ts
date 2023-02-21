import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for todoList
 * =============================================================================
 */

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
  task?: {
    "@id": "Task";
  }[];
}
