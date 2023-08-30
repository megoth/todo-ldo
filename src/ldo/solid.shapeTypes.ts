import { ShapeType } from "ldo";
import { solidSchema } from "./solid.schema";
import { solidContext } from "./solid.context";
import {
  Container,
  Resource,
  TypeIndex,
  TypeRegistration,
  WebIdProfile,
} from "./solid.typings";

/**
 * =============================================================================
 * LDO ShapeTypes solid
 * =============================================================================
 */

/**
 * Container ShapeType
 */
export const ContainerShapeType: ShapeType<Container> = {
  schema: solidSchema,
  shape: "https://icanhasweb.net/shapes/solid.ttl#Container",
  context: solidContext,
};

/**
 * Resource ShapeType
 */
export const ResourceShapeType: ShapeType<Resource> = {
  schema: solidSchema,
  shape: "https://icanhasweb.net/shapes/solid.ttl#Resource",
  context: solidContext,
};

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

/**
 * WebIdProfile ShapeType
 */
export const WebIdProfileShapeType: ShapeType<WebIdProfile> = {
  schema: solidSchema,
  shape: "https://icanhasweb.net/shapes/solid.ttl#WebIdProfile",
  context: solidContext,
};
