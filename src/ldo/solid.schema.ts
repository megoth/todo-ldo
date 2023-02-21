import { Schema } from "shexj";

/**
 * =============================================================================
 * solidSchema: ShexJ Schema for solid
 * =============================================================================
 */
export const solidSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "http://www.w3.org/ns/solid/terms#ContainerShape",
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
                values: [
                  "http://www.w3.org/ns/ldp#BasicContainer",
                  "http://www.w3.org/ns/ldp#Container",
                ],
              },
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/ldp#contains",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: -1,
            },
          ],
        },
        extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
      },
    },
    {
      id: "http://www.w3.org/ns/solid/terms#ResourceShape",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "TripleConstraint",
          predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          valueExpr: {
            type: "NodeConstraint",
            values: ["http://www.w3.org/ns/ldp#Resource"],
          },
        },
        extra: ["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"],
      },
    },
    {
      id: "http://www.w3.org/ns/solid/terms#TypeIndexShape",
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
    {
      id: "http://www.w3.org/ns/solid/terms#TypeRegistrationShape",
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
    {
      id: "http://www.w3.org/ns/solid/terms#WebIdProfileShape",
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
              predicate: "http://www.w3.org/2006/vcard/ns#fn",
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
                nodeKind: "iri",
              },
              min: 1,
              max: -1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/pim/space#preferencesFile",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/solid/terms#publicTypeIndex",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
              },
              min: 0,
              max: 1,
            },
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/ns/solid/terms#privateTypeIndex",
              valueExpr: {
                type: "NodeConstraint",
                nodeKind: "iri",
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
