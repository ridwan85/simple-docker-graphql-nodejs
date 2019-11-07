"use strict";
const { GraphQLNonNull, GraphQLString } = require("graphql");
const ownerType = require("../../Types");
const fs = require("fs");

exports.remove = {
  description : "This action will delete single owner from the system",
  type: ownerType.ownerType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (root, args) => {
    console.log(args);
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
