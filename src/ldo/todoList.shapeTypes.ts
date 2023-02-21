import { ShapeType } from "ldo";
import { todoListSchema } from "./todoList.schema";
import { todoListContext } from "./todoList.context";
import { ListShape } from "./todoList.typings";

/**
 * =============================================================================
 * LDO ShapeTypes todoList
 * =============================================================================
 */

/**
 * ListShape ShapeType
 */
export const ListShapeShapeType: ShapeType<ListShape> = {
  schema: todoListSchema,
  shape: "https://icanhasweb.net/vocab/todo.ttl#ListShape",
  context: todoListContext,
};
