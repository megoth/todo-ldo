import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for todoList
 * =============================================================================
 */

/**
 * TodoListShape Type
 */
export interface TodoListShape {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: string;
  name?: string;
  task?: string[];
}
