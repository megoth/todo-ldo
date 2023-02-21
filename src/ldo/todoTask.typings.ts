import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for todoTask
 * =============================================================================
 */

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
