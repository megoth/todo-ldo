import { ShapeType } from "ldo";
import { containerSchema } from "./container.schema";
import { containerContext } from "./container.context";
import { ContainerShape } from "./container.typings";

/**
 * =============================================================================
 * LDO ShapeTypes container
 * =============================================================================
 */

/**
 * ContainerShape ShapeType
 */
export const ContainerShapeShapeType: ShapeType<ContainerShape> = {
  schema: containerSchema,
  shape: "http://www.w3.org/ns/ldp#ContainerShape",
  context: containerContext,
};
