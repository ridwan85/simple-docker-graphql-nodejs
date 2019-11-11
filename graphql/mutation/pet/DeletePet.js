import { GraphQLNonNull, GraphQLString } from "graphql";
import { petType } from "../../Types";
import fs from "fs";

const remove = {
    description: "This action will delete single pet from the system",
    type: petType,
    args: {
        id: {
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

module.exports = { remove };