import { Schema } from "shexj";

/**
 * =============================================================================
 * todoSchema: ShexJ Schema for todo
 * =============================================================================
 */
export const todoSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "https://icanhasweb.net/shapes/todo.ttl#Document",
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
                values: ["https://icanhasweb.net/vocab/todo.ttl#Document"],
              },
            },
            {
              type: "TripleConstraint",
              predicate: "https://icanhasweb.net/vocab/todo.ttl#list",
              valueExpr: "https://icanhasweb.net/shapes/todo.ttl#List",
              min: 0,
              max: -1,
            },
          ],
        },
        extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
      },
    },
    {
      id: "https://icanhasweb.net/shapes/todo.ttl#List",
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
                values: ["https://icanhasweb.net/vocab/todo.ttl#List"],
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
              valueExpr: "https://icanhasweb.net/shapes/todo.ttl#Task",
              min: 0,
              max: -1,
            },
          ],
        },
        extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
      },
    },
    {
      id: "https://icanhasweb.net/shapes/todo.ttl#Task",
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
                values: ["https://icanhasweb.net/vocab/todo.ttl#Task"],
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
                values: [
                  "https://icanhasweb.net/vocab/todo.ttl#complete",
                  "https://icanhasweb.net/vocab/todo.ttl#incomplete",
                ],
              },
              min: 0,
              max: 1,
            },
          ],
        },
        extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
      },
    },
  ],
};
