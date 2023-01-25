import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for todoList
 * =============================================================================
 */

/**
 * TodoList Type
 */
export interface TodoList {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: string;
  listName?: string;
  hasTask?: string[];
}
