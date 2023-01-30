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
  shape: "https://ldo.js.org/ContainerShape",
  context: containerContext,
};
