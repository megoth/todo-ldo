import { ShapeType } from "ldo";
import { todoSchema } from "./todo.schema";
import { todoContext } from "./todo.context";
import { Document, List, Task } from "./todo.typings";

/**
 * =============================================================================
 * LDO ShapeTypes todo
 * =============================================================================
 */

/**
 * Document ShapeType
 */
export const DocumentShapeType: ShapeType<Document> = {
  schema: todoSchema,
  shape: "https://icanhasweb.net/shapes/todo.ttl#Document",
  context: todoContext,
};

/**
 * List ShapeType
 */
export const ListShapeType: ShapeType<List> = {
  schema: todoSchema,
  shape: "https://icanhasweb.net/shapes/todo.ttl#List",
  context: todoContext,
};

/**
 * Task ShapeType
 */
export const TaskShapeType: ShapeType<Task> = {
  schema: todoSchema,
  shape: "https://icanhasweb.net/shapes/todo.ttl#Task",
  context: todoContext,
};
