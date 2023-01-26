import { Schema } from "shexj";

/**
 * =============================================================================
 * resourceSchema: ShexJ Schema for resource
 * =============================================================================
 */
export const resourceSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "https://ldo.js.org/ResourceShape",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "TripleConstraint",
          predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          valueExpr: {
            type: "NodeConstraint",
            datatype: "http://www.w3.org/ns/ldp#Resource",
          },
        },
        extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
      },
    },
  ],
};
