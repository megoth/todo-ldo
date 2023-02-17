import { ShapeType } from "ldo";
import { typeIndexSchema } from "./typeIndex.schema";
import { typeIndexContext } from "./typeIndex.context";
import { TypeIndex } from "./typeIndex.typings";

/**
 * =============================================================================
 * LDO ShapeTypes typeIndex
 * =============================================================================
 */

/**
 * TypeIndex ShapeType
 */
export const TypeIndexShapeType: ShapeType<TypeIndex> = {
  schema: typeIndexSchema,
  shape: "https://ldo.js.org/#TypeIndex",
  context: typeIndexContext,
};
