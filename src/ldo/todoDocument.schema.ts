import { Schema } from "shexj";

/**
 * =============================================================================
 * todoDocumentSchema: ShexJ Schema for todoDocument
 * =============================================================================
 */
export const todoDocumentSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "https://icanhasweb.net/vocab/todo.ttl#DocumentShape",
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
              valueExpr: {
                type: "NodeConstraint",
                values: ["https://icanhasweb.net/vocab/todo.ttl#List"],
              },
              min: 0,
              max: -1,
            },
          ],
        },
        extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
      },
    },
  ],
};
