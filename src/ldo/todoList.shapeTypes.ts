import { ShapeType } from "ldo";
import { todoListSchema } from "./todoList.schema";
import { todoListContext } from "./todoList.context";
import { TodoList } from "./todoList.typings";

/**
 * =============================================================================
 * LDO ShapeTypes todoList
 * =============================================================================
 */

/**
 * TodoList ShapeType
 */
export const TodoListShapeType: ShapeType<TodoList> = {
  schema: todoListSchema,
  shape: "https://ldo.js.org/TodoList",
  context: todoListContext,
};
