import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for todo
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

/**
 * TodoTask Type
 */
export interface TodoTask {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: string;
  taskDescription: string;
  taskDone?: boolean;
}
