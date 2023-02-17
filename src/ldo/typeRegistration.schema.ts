import { Schema } from "shexj";

/**
 * =============================================================================
 * typeRegistrationSchema: ShexJ Schema for typeRegistration
 * =============================================================================
 */
export const typeRegistrationSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "https://ldo.js.org/#TypeRegistration",
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
                values: ["http://www.w3.org/ns/solid/terms#TypeRegistration"],
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/solid/terms#forClass",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
            },
            {
              type: "OneOf",
              expressions: [
                {
                  type: "TripleConstraint",
                  predicate:
                    "http://www.w3.org/ns/solid/terms#instanceContainer",
                  valueExpr: {
                    type: "Shape",
                    expression: {
                      type: "TripleConstraint",
                      predicate:
                        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                      valueExpr: {
                        type: "NodeConstraint",
                        values: ["http://www.w3.org/ns/ldp#Container"],
                      },
                    },
                  },
                },
                {
                  type: "TripleConstraint",
                  predicate: "http://www.w3.org/ns/solid/terms#instance",
                  valueExpr: {
                    type: "NodeConstraint",
                    nodeKind: "iri",
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
