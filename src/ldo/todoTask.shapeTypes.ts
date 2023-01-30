import { ShapeType } from "ldo";
import { todoTaskSchema } from "./todoTask.schema";
import { todoTaskContext } from "./todoTask.context";
import { TodoTaskShape } from "./todoTask.typings";

/**
 * =============================================================================
 * LDO ShapeTypes todoTask
 * =============================================================================
 */

/**
 * TodoTaskShape ShapeType
 */
export const TodoTaskShapeShapeType: ShapeType<TodoTaskShape> = {
  schema: todoTaskSchema,
  shape: "https://ldo.js.org/TodoTaskShape",
  context: todoTaskContext,
};
