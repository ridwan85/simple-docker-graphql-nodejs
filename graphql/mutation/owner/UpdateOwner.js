import { GraphQLNonNull, GraphQLString } from "graphql";
import { ownerType } from "../../Types";
import fs from "fs";

const update = {
    description: "This action will update single owner inside the system",
    type: ownerType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        address: {
            type: new GraphQLNonNull(GraphQLString)
        },
        phone: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async(root, args) => {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile("data/owners.json", "utf8", (err, jsonData) => {
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
                        fs.writeFileSync("data/owners.json", data);
                        resolve(args);
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }
};

module.exports = { update };