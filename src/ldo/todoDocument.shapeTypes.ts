import { ShapeType } from "ldo";
import { todoDocumentSchema } from "./todoDocument.schema";
import { todoDocumentContext } from "./todoDocument.context";
import { TodoDocumentShape } from "./todoDocument.typings";

/**
 * =============================================================================
 * LDO ShapeTypes todoDocument
 * =============================================================================
 */

/**
 * TodoDocumentShape ShapeType
 */
export const TodoDocumentShapeShapeType: ShapeType<TodoDocumentShape> = {
  schema: todoDocumentSchema,
  shape: "https://ldo.js.org/TodoDocumentShape",
  context: todoDocumentContext,
};
