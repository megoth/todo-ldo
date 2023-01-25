import { ShapeType } from "ldo";
import { todoTaskSchema } from "./todoTask.schema";
import { todoTaskContext } from "./todoTask.context";
import { TodoTask } from "./todoTask.typings";

/**
 * =============================================================================
 * LDO ShapeTypes todoTask
 * =============================================================================
 */

/**
 * TodoTask ShapeType
 */
export const TodoTaskShapeType: ShapeType<TodoTask> = {
  schema: todoTaskSchema,
  shape: "https://ldo.js.org/TodoTask",
  context: todoTaskContext,
};
