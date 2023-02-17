import { ShapeType } from "ldo";
import { typeRegistrationSchema } from "./typeRegistration.schema";
import { typeRegistrationContext } from "./typeRegistration.context";
import { TypeRegistration } from "./typeRegistration.typings";

/**
 * =============================================================================
 * LDO ShapeTypes typeRegistration
 * =============================================================================
 */

/**
 * TypeRegistration ShapeType
 */
export const TypeRegistrationShapeType: ShapeType<TypeRegistration> = {
  schema: typeRegistrationSchema,
  shape: "https://ldo.js.org/#TypeRegistration",
  context: typeRegistrationContext,
};
