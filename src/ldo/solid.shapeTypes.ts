import { ShapeType } from "ldo";
import { solidSchema } from "./solid.schema";
import { solidContext } from "./solid.context";
import { TypeIndex, TypeRegistration } from "./solid.typings";

/**
 * =============================================================================
 * LDO ShapeTypes solid
 * =============================================================================
 */

/**
 * TypeIndex ShapeType
 */
export const TypeIndexShapeType: ShapeType<TypeIndex> = {
  schema: solidSchema,
  shape: "https://icanhasweb.net/shapes/solid.ttl#TypeIndex",
  context: solidContext,
};

/**
 * TypeRegistration ShapeType
 */
export const TypeRegistrationShapeType: ShapeType<TypeRegistration> = {
  schema: solidSchema,
  shape: "https://icanhasweb.net/shapes/solid.ttl#TypeRegistration",
  context: solidContext,
};
