import { ShapeType } from "ldo";
import { todoDocumentSchema } from "./todoDocument.schema";
import { todoDocumentContext } from "./todoDocument.context";
import { DocumentShape } from "./todoDocument.typings";

/**
 * =============================================================================
 * LDO ShapeTypes todoDocument
 * =============================================================================
 */

/**
 * DocumentShape ShapeType
 */
export const DocumentShapeShapeType: ShapeType<DocumentShape> = {
  schema: todoDocumentSchema,
  shape: "https://icanhasweb.net/vocab/todo.ttl#DocumentShape",
  context: todoDocumentContext,
};
