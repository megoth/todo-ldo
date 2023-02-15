import { Schema } from "shexj";

/**
 * =============================================================================
 * todoTaskSchema: ShexJ Schema for todoTask
 * =============================================================================
 */
export const todoTaskSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "https://ldo.js.org/TodoTaskShape",
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
                datatype: "https://icanhasweb.net/vocab/todo.ttl#Task",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://icanhasweb.net/vocab/todo.ttl#description",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://icanhasweb.net/vocab/todo.ttl#status",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "https://icanhasweb.net/vocab/todo.ttl#Status",
              },
              min: 0,
              max: 1,
            },
          ],
        },
      },
    },
  ],
};
