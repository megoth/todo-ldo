import { ShapeType } from "ldo";
import { typeIndexSchema } from "./typeIndex.schema";
import { typeIndexContext } from "./typeIndex.context";
import { TypeIndexShape } from "./typeIndex.typings";

/**
 * =============================================================================
 * LDO ShapeTypes typeIndex
 * =============================================================================
 */

/**
 * TypeIndexShape ShapeType
 */
export const TypeIndexShapeShapeType: ShapeType<TypeIndexShape> = {
  schema: typeIndexSchema,
  shape: "http://www.w3.org/ns/solid/terms#TypeIndexShape",
  context: typeIndexContext,
};
