import { ShapeType } from "ldo";
import { solidSchema } from "./solid.schema";
import { solidContext } from "./solid.context";
import {
  ContainerShape,
  ResourceShape,
  TypeIndexShape,
  TypeRegistrationShape,
  WebIdProfileShape,
} from "./solid.typings";

/**
 * =============================================================================
 * LDO ShapeTypes solid
 * =============================================================================
 */

/**
 * ContainerShape ShapeType
 */
export const ContainerShapeShapeType: ShapeType<ContainerShape> = {
  schema: solidSchema,
  shape: "http://www.w3.org/ns/solid/terms#ContainerShape",
  context: solidContext,
};

/**
 * ResourceShape ShapeType
 */
export const ResourceShapeShapeType: ShapeType<ResourceShape> = {
  schema: solidSchema,
  shape: "http://www.w3.org/ns/solid/terms#ResourceShape",
  context: solidContext,
};

/**
 * TypeIndexShape ShapeType
 */
export const TypeIndexShapeShapeType: ShapeType<TypeIndexShape> = {
  schema: solidSchema,
  shape: "http://www.w3.org/ns/solid/terms#TypeIndexShape",
  context: solidContext,
};

/**
 * TypeRegistrationShape ShapeType
 */
export const TypeRegistrationShapeShapeType: ShapeType<TypeRegistrationShape> =
  {
    schema: solidSchema,
    shape: "http://www.w3.org/ns/solid/terms#TypeRegistrationShape",
    context: solidContext,
  };

/**
 * WebIdProfileShape ShapeType
 */
export const WebIdProfileShapeShapeType: ShapeType<WebIdProfileShape> = {
  schema: solidSchema,
  shape: "http://www.w3.org/ns/solid/terms#WebIdProfileShape",
  context: solidContext,
};
