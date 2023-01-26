import { ShapeType } from "ldo";
import { webIdProfileSchema } from "./webIdProfile.schema";
import { webIdProfileContext } from "./webIdProfile.context";
import { WebIdProfile } from "./webIdProfile.typings";

/**
 * =============================================================================
 * LDO ShapeTypes webIdProfile
 * =============================================================================
 */

/**
 * WebIdProfile ShapeType
 */
export const WebIdProfileShapeType: ShapeType<WebIdProfile> = {
  schema: webIdProfileSchema,
  shape: "https://ldo.js.org/WebIdProfile",
  context: webIdProfileContext,
};
