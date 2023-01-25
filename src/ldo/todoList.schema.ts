import { Schema } from "shexj";

/**
 * =============================================================================
 * todoListSchema: ShexJ Schema for todoList
 * =============================================================================
 */
export const todoListSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "https://ldo.js.org/TodoList",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "https://icanhasweb.net/vocab/todo.ttl#TodoList",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://icanhasweb.net/vocab/todo.ttl#listName",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://icanhasweb.net/vocab/todo.ttl#hasTask",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "https://icanhasweb.net/vocab/todo.ttl#TodoTask",
              },
              min: 0,
              max: -1,
            },
          ],
        },
      },
    },
  ],
};
