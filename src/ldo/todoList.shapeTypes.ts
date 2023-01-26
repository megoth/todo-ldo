import { ShapeType } from "ldo";
import { todoListSchema } from "./todoList.schema";
import { todoListContext } from "./todoList.context";
import { TodoListShape } from "./todoList.typings";

/**
 * =============================================================================
 * LDO ShapeTypes todoList
 * =============================================================================
 */

/**
 * TodoListShape ShapeType
 */
export const TodoListShapeShapeType: ShapeType<TodoListShape> = {
  schema: todoListSchema,
  shape: "https://ldo.js.org/TodoListShape",
  context: todoListContext,
};
