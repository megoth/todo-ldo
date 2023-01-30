import { ShapeType } from "ldo";
import { webIdProfileSchema } from "./webIdProfile.schema";
import { webIdProfileContext } from "./webIdProfile.context";
import { WebIdProfileShape } from "./webIdProfile.typings";

/**
 * =============================================================================
 * LDO ShapeTypes webIdProfile
 * =============================================================================
 */

/**
 * WebIdProfileShape ShapeType
 */
export const WebIdProfileShapeShapeType: ShapeType<WebIdProfileShape> = {
  schema: webIdProfileSchema,
  shape: "https://ldo.js.org/WebIdProfileShape",
  context: webIdProfileContext,
};
