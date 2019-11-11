import { GraphQLList, GraphQLString } from "graphql";
import fs from "fs";
import { ownerType } from "../Types";

//Queries
const OwnerQuery = {
    description: "Return all information about owners",
    type: new GraphQLList(ownerType),
    resolve: async() => {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile("data/owners.json", "utf8", (err, jsonData) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (!jsonData) {
                            //empty data

                            const owner = [];
                            resolve(owner);
                        } else {
                            //already have some data
                            const owner = JSON.parse(jsonData);
                            resolve(owner);
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
const SingleOwnerQuery = {
    description: "Return all information about one owner based on id",
    type: ownerType,
    args: { id: { type: GraphQLString } },
    resolve: async(root, args) => {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile("data/owners.json", "utf8", (err, jsonData) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (!jsonData) {
                            //empty data

                            const owner = [];
                            resolve(owner);
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

module.exports = { OwnerQuery, SingleOwnerQuery };