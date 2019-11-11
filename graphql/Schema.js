import { GraphQLSchema, GraphQLObjectType } from "graphql";
import ownerQuery from "./queries/OwnerQuery";
import petQuery from "./queries/PetQuery";
import mutation from "./mutation/Mutation";

const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            owners: ownerQuery.OwnerQuery,
            owner: ownerQuery.SingleOwnerQuery,
            pets: petQuery.PetQuery,
            pet: petQuery.SinglePetQuery
        }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: mutation
    })
});

module.exports = { Schema };