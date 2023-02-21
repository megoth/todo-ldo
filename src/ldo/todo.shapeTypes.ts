import { ShapeType } from "ldo";
import { todoSchema } from "./todo.schema";
import { todoContext } from "./todo.context";
import { DocumentShape, ListShape, TaskShape } from "./todo.typings";

/**
 * =============================================================================
 * LDO ShapeTypes todo
 * =============================================================================
 */

/**
 * DocumentShape ShapeType
 */
export const DocumentShapeShapeType: ShapeType<DocumentShape> = {
  schema: todoSchema,
  shape: "https://icanhasweb.net/vocab/todo.ttl#DocumentShape",
  context: todoContext,
};

/**
 * ListShape ShapeType
 */
export const ListShapeShapeType: ShapeType<ListShape> = {
  schema: todoSchema,
  shape: "https://icanhasweb.net/vocab/todo.ttl#ListShape",
  context: todoContext,
};

/**
 * TaskShape ShapeType
 */
export const TaskShapeShapeType: ShapeType<TaskShape> = {
  schema: todoSchema,
  shape: "https://icanhasweb.net/vocab/todo.ttl#TaskShape",
  context: todoContext,
};
