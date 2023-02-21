import { ShapeType } from "ldo";
import { typeRegistrationSchema } from "./typeRegistration.schema";
import { typeRegistrationContext } from "./typeRegistration.context";
import { TypeRegistrationShape } from "./typeRegistration.typings";

/**
 * =============================================================================
 * LDO ShapeTypes typeRegistration
 * =============================================================================
 */

/**
 * TypeRegistrationShape ShapeType
 */
export const TypeRegistrationShapeShapeType: ShapeType<TypeRegistrationShape> =
  {
    schema: typeRegistrationSchema,
    shape: "http://www.w3.org/ns/solid/terms#TypeRegistrationShape",
    context: typeRegistrationContext,
  };
