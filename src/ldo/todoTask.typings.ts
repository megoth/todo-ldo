import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for todoTask
 * =============================================================================
 */

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
