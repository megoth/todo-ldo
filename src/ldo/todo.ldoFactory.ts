import { LdoFactory } from "ldo";
import { TodoListShapeType, TodoTaskShapeType } from "./todo.shapeTypes";

/**
 * =============================================================================
 * LDO Factories for todo
 * =============================================================================
 */

/**
 * TodoList LdoFactory
 */
export const TodoListFactory = new LdoFactory(TodoListShapeType);

/**
 * TodoTask LdoFactory
 */
export const TodoTaskFactory = new LdoFactory(TodoTaskShapeType);
