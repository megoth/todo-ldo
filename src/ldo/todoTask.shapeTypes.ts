import { ShapeType } from "ldo";
import { todoTaskSchema } from "./todoTask.schema";
import { todoTaskContext } from "./todoTask.context";
import { TaskShape } from "./todoTask.typings";

/**
 * =============================================================================
 * LDO ShapeTypes todoTask
 * =============================================================================
 */

/**
 * TaskShape ShapeType
 */
export const TaskShapeShapeType: ShapeType<TaskShape> = {
  schema: todoTaskSchema,
  shape: "https://icanhasweb.net/vocab/todo.ttl#TaskShape",
  context: todoTaskContext,
};
