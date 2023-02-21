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
  shape: "http://www.w3.org/ns/ldp#ResourceShape",
  context: resourceContext,
};
