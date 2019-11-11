import { GraphQLList, GraphQLString } from "graphql";
import fs from "fs";
import { petType } from "../Types";

// Queries
const PetQuery = {
    description: "Return all information about pets",
    type: new GraphQLList(petType),
    resolve: async() => {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile("data/pets.json", "utf8", (err, jsonData) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (!jsonData) {
                            //empty data

                            const pet = [];
                            resolve(pet);
                        } else {
                            //already have some data
                            const pet = JSON.parse(jsonData);
                            resolve(pet);
                        }
                    }
                });
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }
};
const SinglePetQuery = {
    description: "Return all information about one pet based on id",
    type: petType,
    args: { id: { type: GraphQLString } },
    resolve: async(root, args) => {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile("data/pets.json", "utf8", (err, jsonData) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (!jsonData) {
                            //empty data

                            const pet = [];
                            resolve(pet);
                        } else {
                            //already have some data
                            let arr = JSON.parse(jsonData);
                            let filtered = arr.filter(item => {
                                return item.id == args.id;
                            });

                            resolve(filtered[0]);
                        }
                    }
                });
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }
};


module.exports = { PetQuery, SinglePetQuery };