import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from "graphql";

import fs from "fs";

const ownerType = new GraphQLObjectType({
    description: "Owner Data type",
    name: "owner",
    fields: function fields() {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: { type: GraphQLString },
            address: { type: GraphQLString },
            phone: { type: GraphQLString },
            email: { type: GraphQLString },
            pet: {
                type: new GraphQLList(petType),
                resolve: function resolve(root, args) {
                    return new Promise(function(resolve, reject) {
                        try {
                            fs.readFile("data/pets.json", "utf8", function(err, jsonData) {
                                if (err) reject(err);
                                if (!jsonData) {
                                    var data = [];
                                    resolve(data);
                                } else {
                                    var arr = JSON.parse(jsonData);
                                    var filtered = arr.filter(function(item) {
                                        return item.ownerId == root.id;
                                    });
                                    resolve(filtered);
                                }
                            });
                        } catch (err) {
                            console.log(err);
                            reject(err);
                        }
                    });
                }
            }
        };
    }
});

const petType = new GraphQLObjectType({
    description: "Pet Data type",
    name: "pet",
    fields: function fields() {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            ownerId: { type: GraphQLString },
            animalId: { type: GraphQLString },
            name: { type: GraphQLString },
            colour: { type: GraphQLString },
            age: { type: GraphQLInt },
            breed: { type: GraphQLString },
            owner: {
                type: ownerType,
                resolve: function resolve(root, args) {
                    return new Promise(function(resolve, reject) {
                        try {
                            fs.readFile("data/owners.json", "utf8", function(err, jsonData) {
                                if (err) reject(err);
                                if (!jsonData) {
                                    var data = [];
                                    resolve(data);
                                } else {

                                    var arr = JSON.parse(jsonData);

                                    var filtered = arr.filter(function(item) {
                                        return item.id == root.ownerId;
                                    });
                                    //return only single data as a pet belong to 1 owner
                                    resolve(filtered[0]);
                                }
                            });
                        } catch (err) {
                            console.log(err);
                        }
                    });
                }
            },
            animal: {
                type: animalType,
                resolve: function resolve(root, args) {
                    return new Promise(function(resolve, reject) {
                        try {
                            fs.readFile("data/animal.json", "utf8", function(err, jsonData) {
                                if (err) reject(err);
                                if (!jsonData) {
                                    var data = [];
                                    resolve(data);
                                } else {

                                    var arr = JSON.parse(jsonData);

                                    var filtered = arr.filter(function(item) {
                                        return item.id == root.animalId;
                                    });
                                    //return only single data as 1 pet is only 1 type of animal
                                    resolve(filtered[0]);
                                }
                            });
                        } catch (err) {
                            console.log(err);
                        }
                    });
                }
            }
        };
    }
});

const animalType = new GraphQLObjectType({
    description: "Animal Data type",
    name: "animal",
    fields: function fields() {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: { type: GraphQLString },
            description: { type: GraphQLString }
        };
    }
});

module.exports = { petType: petType, ownerType: ownerType, animalType: animalType }