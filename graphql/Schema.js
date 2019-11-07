"use strict";
const {GraphQLSchema, GraphQLObjectType} = require("graphql");
const ownerQuery = require("./queries/OwnerQuery");
const petQuery = require("./queries/PetQuery");
const mutation = require("./mutation/Mutation");
exports.Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      owners : ownerQuery.OwnerQuery,
      owner : ownerQuery.SingleOwnerQuery,
      pets : petQuery.PetQuery,
      pet : petQuery.SinglePetQuery      
    }
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: mutation
  })
});
