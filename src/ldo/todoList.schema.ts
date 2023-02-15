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
      id: "https://ldo.js.org/TodoListShape",
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
                datatype: "https://icanhasweb.net/vocab/todo.ttl#List",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://icanhasweb.net/vocab/todo.ttl#name",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "https://icanhasweb.net/vocab/todo.ttl#task",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "https://icanhasweb.net/vocab/todo.ttl#Task",
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
