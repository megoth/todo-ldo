import { Schema } from "shexj";

/**
 * =============================================================================
 * webIdProfileSchema: ShexJ Schema for webIdProfile
 * =============================================================================
 */
export const webIdProfileSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "https://ldo.js.org/WebIdProfile",
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
                values: ["http://xmlns.com/foaf/0.1/Person"],
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://xmlns.com/foaf/0.1/name",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/pim/space#storage",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/ns/pim/space#Storage",
              },
              min: 1,
              max: -1,
            },
          ],
        },
        extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
      },
    },
  ],
};
