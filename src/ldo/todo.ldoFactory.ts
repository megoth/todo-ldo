import { LdoFactory } from "ldo";
import {
  DocumentShapeShapeType,
  ListShapeShapeType,
  TaskShapeShapeType,
} from "./todo.shapeTypes";

/**
 * =============================================================================
 * LDO Factories for todo
 * =============================================================================
 */

/**
 * DocumentShape LdoFactory
 */
export const DocumentShapeFactory = new LdoFactory(DocumentShapeShapeType);

/**
 * ListShape LdoFactory
 */
export const ListShapeFactory = new LdoFactory(ListShapeShapeType);

/**
 * TaskShape LdoFactory
 */
export const TaskShapeFactory = new LdoFactory(TaskShapeShapeType);
