import { ShapeType } from "ldo";
import { todoSchema } from "./todo.schema";
import { todoContext } from "./todo.context";
import { TodoList, TodoTask } from "./todo.typings";

/**
 * =============================================================================
 * LDO ShapeTypes todo
 * =============================================================================
 */

/**
 * TodoList ShapeType
 */
export const TodoListShapeType: ShapeType<TodoList> = {
  schema: todoSchema,
  shape: "https://ldo.js.org/TodoList",
  context: todoContext,
};

/**
 * TodoTask ShapeType
 */
export const TodoTaskShapeType: ShapeType<TodoTask> = {
  schema: todoSchema,
  shape: "https://ldo.js.org/TodoTask",
  context: todoContext,
};
