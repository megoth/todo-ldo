import { LdoFactory } from "ldo";
import {
  ContainerShapeShapeType,
  ResourceShapeShapeType,
  TypeIndexShapeShapeType,
  TypeRegistrationShapeShapeType,
  WebIdProfileShapeShapeType,
} from "./solid.shapeTypes";

/**
 * =============================================================================
 * LDO Factories for solid
 * =============================================================================
 */

/**
 * ContainerShape LdoFactory
 */
export const ContainerShapeFactory = new LdoFactory(ContainerShapeShapeType);

/**
 * ResourceShape LdoFactory
 */
export const ResourceShapeFactory = new LdoFactory(ResourceShapeShapeType);

/**
 * TypeIndexShape LdoFactory
 */
export const TypeIndexShapeFactory = new LdoFactory(TypeIndexShapeShapeType);

/**
 * TypeRegistrationShape LdoFactory
 */
export const TypeRegistrationShapeFactory = new LdoFactory(
  TypeRegistrationShapeShapeType
);

/**
 * WebIdProfileShape LdoFactory
 */
export const WebIdProfileShapeFactory = new LdoFactory(
  WebIdProfileShapeShapeType
);
