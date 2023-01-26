import { ShapeType } from "ldo";
import { resourceSchema } from "./resource.schema";
import { resourceContext } from "./resource.context";
import { ResourceShape } from "./resource.typings";

/**
 * =============================================================================
 * LDO ShapeTypes resource
 * =============================================================================
 */

/**
 * ResourceShape ShapeType
 */
export const ResourceShapeShapeType: ShapeType<ResourceShape> = {
  schema: resourceSchema,
  shape: "https://ldo.js.org/ResourceShape",
  context: resourceContext,
};
