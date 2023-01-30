import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for todoTask
 * =============================================================================
 */

/**
 * TodoTaskShape Type
 */
export interface TodoTaskShape {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type: string;
  taskDescription: string;
  taskDone?: boolean;
}
