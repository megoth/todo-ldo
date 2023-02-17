import { Schema } from "shexj";

/**
 * =============================================================================
 * typeIndexSchema: ShexJ Schema for typeIndex
 * =============================================================================
 */
export const typeIndexSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "https://ldo.js.org/#TypeIndex",
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
                values: ["http://www.w3.org/ns/solid/terms#TypeIndex"],
              },
            },
            {
              type: "OneOf",
              expressions: [
                {
                  type: "TripleConstraint",
                  predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                  valueExpr: {
                    type: "NodeConstraint",
                    values: ["http://www.w3.org/ns/solid/terms#ListedDocument"],
                  },
                },
                {
                  type: "TripleConstraint",
                  predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                  valueExpr: {
                    type: "NodeConstraint",
                    values: [
                      "http://www.w3.org/ns/solid/terms#UnlistedDocument",
                    ],
                  },
                },
              ],
            },
          ],
        },
        extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
      },
    },
  ],
};
