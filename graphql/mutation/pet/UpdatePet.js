"use strict";
const { GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");
const petType = require("../../Types");
const fs = require("fs");

exports.update = {
    description: "This action will update single pet inside the system",
    type: petType.petType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        colour: {
            type: new GraphQLNonNull(GraphQLString)
        },
        age: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        breed: {
            type: new GraphQLNonNull(GraphQLString)
        },
        ownerId: {
            type: new GraphQLNonNull(GraphQLString)
        },
        animalId: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async(root, args) => {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile("data/pets.json", "utf8", (err, jsonData) => {
                    if (err) reject(err);
                    if (!jsonData) {
                        resolve(args);
                    } else {
                        let arr = JSON.parse(jsonData);
                        let filtered = arr.filter(item => {
                            return item.id !== args.id;
                        });

                        //push changes to the new data
                        filtered.push(args);
                        let data = JSON.stringify(filtered);
                        //save to a json file
                        fs.writeFileSync("data/pets.json", data);
                        resolve(args);
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }
};